'use strict'
const { AttributeModel } = require('../database/models')
const { errorResponse } = require("../core")
const _ = require('lodash')
const { newAttributeValue, allAttributeValue } = require('./attribute_value.service')
class AttributeService {

    async newAttribute({
        attribute_name, attribute_value_list = []
    }) {
        try {
            const attributes = await AttributeModel.create({
                attribute_name
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
    async findAttribute({
        attribute_id
    }) {
        try {
            const attribute = await AttributeModel.findOne({ _id: attribute_id })
            console.log(attribute)

            if (!attribute) throw new errorResponse.NotFoundRequestError('attribute not found')

            const attribute_value = await allAttributeValue({ attribute_id: attribute._id })
            console.log(attribute_value)

            return {
                attribute_info: _.omit(attribute, ['__v', 'updateAt']),
                attribute_value_list: attribute_value.map(attributeValue => _.omit(attributeValue, ['__v', 'updateAt', 'createAt',]))
            }
        } catch (error) {
            return null
        }
    }
}

module.exports = AttributeService