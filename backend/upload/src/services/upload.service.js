"use strict";

const cloudinary = require('../config/cloudinary.config')

class UploadService {
    async uploadSkuImageList(
        files,
        { folderName = 'outrunner/products', sku_list = "" }) {

        console.log("Array.isArray(sku_list)", Array.isArray(sku_list))
        try {
            if (!files.length) return
            const uploaderUrls = []
            for (const file of files) {
                const result = await cloudinary.v2.uploader.upload(file.path, {
                    folder: folderName
                })
                uploaderUrls.push({
                    image_url: result.secure_url,
                    public_id: result.public_id,
                    thumb_url: await cloudinary.url(result.public_id, {
                        // height: 300,
                        // width: 300,
                    }),
                    result: result
                })
            }
            if (Array.isArray(sku_list) == true) {
                for (let i = 0; i < uploaderUrls.length; i++) {
                    uploaderUrls[i] = { ...uploaderUrls[i], sku_tier_idx: sku_list[i] }
                }
            } else {
                uploaderUrls[0] = { ...uploaderUrls[0], sku_tier_idx: sku_list }
            }
            console.log("uploaderUrls", uploaderUrls)
            return uploaderUrls

        } catch (error) {
            console.log("Err uploading image: ", error)
        }
    }
    async uploadImageArray(
        files,
        { folderName = 'outrunner/products'}) {

        try {
            if (!files.length) return
            const uploaderUrls = []
            for (const file of files) {
                const result = await cloudinary.v2.uploader.upload(file.path, {
                    folder: folderName
                })
                uploaderUrls.push({
                    image_url: result.secure_url,
                    public_id: result.public_id,
                    thumb_url: await cloudinary.url(result.public_id, {
                        // height: 300,
                        // width: 300,
                    }),
                    result: result
                })
            }
           
            console.log("uploaderUrls", uploaderUrls)
            return uploaderUrls

        } catch (error) {
            console.log("Err uploading image: ", error)
        }
    }
    async uploadSingleImage(
        file,
        { folderName = 'outrunner/products' }) {

        try {
            if (!file) return
            const result = await cloudinary.v2.uploader.upload(file.path, {
                folder: folderName
            })
            return {
                image_url: result.secure_url,
                thumb_url: await cloudinary.url(result.public_id),
                public_id: result.public_id,
                result: result
            }

        } catch (error) {
            console.log("Err uploading image: ", error)
        }
    }

    // async serverRPCRequest(payload) {
    //     const { type, data } = payload;
    //     const { customer_id, customer_provider, customer_name, customer_email, customer_avatar } = data
    //     switch (type) {
    //         case "FIND_CUSTOMER_BY_ID_AND_PROVIDER":
    //             if (customer_email) {

    //                 const foundCustomer = await this.findCustomerByEmail({ customer_email })
    //                 console.log("email:", foundCustomer)
    //                 if (foundCustomer) return foundCustomer
    //             }
    //             return await this.findcustomerByIdAndProvider({ customer_id, customer_provider });
    //         case "NEW_CUSTOMER_WITH_SOCIAL":
    //             return await this.newCustomerWithSocial({ customer_id, customer_provider, customer_email, customer_name, customer_avatar });
    //         default:
    //             break;
    //     }
    // }
}

module.exports = UploadService
