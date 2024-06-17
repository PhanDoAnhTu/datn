'use strict'
const { errorResponse } = require('../core')
const { discountRepository } = require('../database')
const { DiscountModel } = require('../database/models')

class DiscountService {

    async createDiscountCode(payload) {
        const {
            discount_name,
            discount_description,
            discount_type,
            discount_value,
            discount_max_value,
            discount_code,
            discount_start_date,
            discount_end_date,
            discount_max_uses,
            discount_max_person_uses,
            discount_max_user_uses,
            discount_min_order_value,
            discount_min_order_qty,
            discount_is_active = false,
            discount_applies_to,
            discount_product_ids = []
        } = payload

        //kiem tra
        if (Date.now() > new Date(discount_start_date) || Date.now() > new Date(discount_end_date)) {
            throw new errorResponse.ForbiddenRequestError('discount code has expired')
        }

        if (new Date(discount_start_date) >= new Date(discount_end_date)) {
            throw new errorResponse.ForbiddenRequestError('start date must be before end_date')
        }

        //create index for discount code
        const foundDiscount = await DiscountModel.findOne({
            discount_code: discount_code
        })

        if (foundDiscount) {
            throw new errorResponse.ForbiddenRequestError('Discount exists')
        }
        console.log('payload', payload)

        const newDiscount = await DiscountModel.create({
            discount_name: discount_name,
            discount_description: discount_description,
            discount_type: discount_type, // percentage 
            discount_value: discount_value, //10.000, 10 
            discount_max_value: discount_max_value,
            discount_code: discount_code, // discountCode 
            discount_start_date: discount_start_date, // ngay bat dau
            discount_end_date: discount_end_date, // ngyay ket thuc
            discount_max_uses: discount_max_uses, // so luong discount duoc ap dung 
            discount_max_person_uses: discount_max_person_uses, // số lượng người dùng tối đa
            discount_max_user_uses: discount_max_user_uses,  // 1 người sử dụng tối đa bao nhiêu lần
            discount_min_order_value: discount_min_order_value,
            discount_min_order_qty: discount_min_order_qty,
            discount_is_active: discount_is_active,
            discount_applies_to: discount_applies_to,
            discount_product_ids: discount_applies_to === 'all' ? [] : discount_product_ids  // so san pham duoc ap dung
        })
        return newDiscount
    }

    async getAllDiscountCodeByShop({
        limit = 50, page = 1, sort = 'ctime', filter = {
            discount_is_active: true
        }
    }) {
        const discounts = await discountRepository.findAllDiscountCodeUnSelect({
            limit,
            page,
            sort,
            filter,
            model: DiscountModel
        })

        return discounts

    }
    async findOneDiscount({
        discount_id
    }) {
        const discount = await DiscountModel.findOne({
            _id: discount_id
        })
        return discount
    }

    async changeIsActiveDiscount({
        discount_id, discount_is_active
    }) {
        const query = { _id: discount_id }
        const updateOrInsert = {
            $set: {
                discount_is_active: discount_is_active
            }
        }, options = {
            upsert: true,
            new: true
        }
        return await DiscountModel.findOneAndUpdate(query, updateOrInsert, options)

    }
    /**
     * 
     */

    async getDiscountAmount({ codeId, userId, products }) {

        const foundDiscount = await discountRepository.checkDiscountExists({
            model: DiscountModel,
            filter: {
                discount_code: codeId
            }
        })

        if (!foundDiscount) throw new errorResponse.NotFoundRequestError("discount not found")
        console.log(foundDiscount)
        const {
            discount_name,
            discount_description,
            discount_type,
            discount_value,
            discount_max_value,
            discount_code,
            discount_start_date,
            discount_end_date,
            discount_max_uses,
            discount_uses_count,
            discount_users_used,
            discount_max_person_uses,
            discount_max_user_uses,
            discount_min_order_value,
            discount_min_order_qty,
            discount_is_active,
            discount_applies_to,
            discount_product_ids } = foundDiscount

        if (!discount_is_active) throw new errorResponse.NotFoundRequestError("discount expried")
        if (discount_max_uses < 1 || discount_users_used.length >= discount_max_uses) throw new errorResponse.NotFoundRequestError("discount are out")
        const uniqueSet = new Set(discount_users_used);
        const discount_users_used_unique = [...uniqueSet];
        if (discount_users_used_unique.length >= discount_max_user_uses) throw new errorResponse.NotFoundRequestError("discount are out")
        if (Date.now() < new Date(discount_start_date) || Date.now() > new Date(discount_end_date) || new Date(discount_start_date) > new Date(discount_end_date)) {
            throw new errorResponse.NotFoundRequestError('discount ecode has expried!')
        }
        if (discount_max_person_uses > 0) {
            const userDiscount = discount_users_used.find(user => user.userId === userId)
            if (userDiscount) {
                //ng dung da su dung ma
            }
        }
        let totalOrder = 0
        let totalOrderDiscount = 0
        if (discount_min_order_value > 0) {
            totalOrder = products.reduce((acc, pro) => {
                return acc + (pro.quantity * pro.price)
            }, 0)
            if (discount_applies_to === "specific") {
                const discount_applies_to_products = await products.filter((product) => discount_product_ids.includes(product.productId) == true)
                console.log(discount_applies_to_products)
                totalOrderDiscount = discount_applies_to_products.reduce((acc, pro) => {
                    return acc + (pro.quantity * pro.price)
                }, 0)
                console.log("discount_applies_to_products", discount_applies_to_products)
            }
            if (discount_applies_to === "all") {
                totalOrderDiscount = totalOrder
            }
            if (totalOrder < discount_min_order_value) {
                throw new errorResponse.NotFoundRequestError(`discount requires a minium order value of ${discount_min_order_value}`)
            }
        }
        let amount = discount_type === 'fixed_amount' ? discount_value : totalOrderDiscount * (discount_value / 100)
        if (amount > discount_max_value) {
            amount = discount_max_value
        }
        return {
            totalOrder,
            discount: amount,
            totalCheckout: totalOrder - amount
        }
    }

    //xoa discount
    async deleteDiscountCode({ codeId }) {
        const deleted = await DiscountModel.deleteOne({
            discount_code: codeId
        })
        return deleted
    }
    //cancel 
    async cancelDiscountCode({ codeId, userId }) {
        const foundDiscount = await discountRepository.checkDiscountExists({
            model: DiscountModel,
            filter: {
                discount_code: codeId
            }
        })
        if (!foundDiscount) {
            throw new errorResponse.ForbiddenRequestError('Discount exists')
        }
        const result = await DiscountModel.findByIdAndUpdate(
            foundDiscount._id, {
            $pull: {
                discount_users_used: userId
            },
            $inc: {
                discount_max_uses: 1,
                discount_uses_count: -1
            }
        })
        return result
    }

    async serverRPCRequest(payload) {
        const { type, data } = payload;
        const { codeId, userId, products } = data
        switch (type) {
            case "GET_DISCOUNT_AMOUNT":
                return this.getDiscountAmount({ codeId, userId, products })
            default:
                break;
        }
    }


}

module.exports = DiscountService