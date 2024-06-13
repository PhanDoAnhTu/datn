'use strict'
const { AttributeModel } = require('../database/models')
const { errorResponse } = require("../core")
const _ = require('lodash')
const { newAttributeValue, allAttributeValue, findAttributeValueById } = require('./attribute_value.service')
class AttributeService {

    async newAttribute({
        attribute_name, attribute_value_list = [], attribute_description = ""
    }) {
        try {
            const foundAttribute = await AttributeModel.findOne({ attribute_name })
            if (foundAttribute) throw new errorResponse.NotFoundRequestError("Attribute has exists")

            const attributes = await AttributeModel.create({
                attribute_name,
                attribute_description
            })
            console.log(attributes)
            let AttributeValue = []
            if (attributes && attribute_value_list.length > 0) {
                AttributeValue = await newAttributeValue({ attribute_id: attributes._id, attribute_value_list })
            }
            return {
                attributes,
                AttributeValue
            }
        } catch (error) {
            return null
        }
    }
    async findAllAttribute() {
        try {
            let attributes = await AttributeModel.find().lean()
            for (let i = 0; i < attributes.length; i++) {
                const attribute_value = await allAttributeValue({ attribute_id: attributes[i]._id })
                attributes[i] = { ...attributes[i], attribute_value }
            }
            return attributes
        } catch (error) {
            return null
        }
    }
    async findAttributeById({
        attribute_id
    }) {
        try {
            const attribute = await AttributeModel.findOne({ _id: attribute_id }).lean()

            if (!attribute) throw new errorResponse.NotFoundRequestError('attribute not found')

            const attribute_value = await allAttributeValue({ attribute_id: attribute._id })
            return {
                attribute_info: _.omit(attribute, ['__v', 'updateAt']),
                attribute_value_list: attribute_value.map(attributeValue => _.omit(attributeValue, ['__v', 'updateAt', 'createAt',]))
            }
        } catch (error) {
            return null
        }
    }


    async findAttributeByIdList({
        attribute_id_list, attribute_value_id_list
    }) {
        try {
            let product_attributes = []
            for (let i = 0; i < attribute_id_list.length; i++) {
                const attribute = await AttributeModel.findOne({ _id: attribute_id_list[i] })
                if (!attribute) throw new errorResponse.NotFoundRequestError('attribute not found')
                const attributes_value = await allAttributeValue({ attribute_id: attribute_id_list[i] })

                const attributes_value_list = await attributes_value.filter(({ _id }) => attribute_value_id_list.some(({ value_id }) => value_id == _id))
                if (!attributes_value_list) throw new errorResponse.NotFoundRequestError('attribute_value not found')
                product_attributes.push({ attribute, attributes_value_list })
            }
            return product_attributes
        } catch (error) {
            return null
        }
    }

    async findAttributesByProductAttributes({
        product_attributes
    }) {
        try {
            const attribute_id_list = await product_attributes.flatMap((attribute) => attribute.attribute_id)
            const attribute_value_id_list = await product_attributes.flatMap((attribute) => attribute.attribute_value)
            console.log('attribute_id_list', attribute_id_list)
            console.log('attribute_value_id_list', attribute_value_id_list)
            const product_attribute = await this.findAttributeByIdList({ attribute_id_list, attribute_value_id_list })
            console.log("product_attributes", product_attribute)

            return product_attribute
        }
        catch (error) {
            return null
        }
    }
}

module.exports = AttributeService