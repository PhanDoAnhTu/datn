'use strict'
const { AttributeValueModel } = require('../database/models')

const newAttributeValue = async ({
    attribute_id, attribute_value_list
}) => {
    try {
        const convert_attribute_value_list = attribute_value_list.map(attribute => {
            return { ...attribute, attribute_id: attribute_id }
        })
        const attributeValues = await AttributeValueModel.create(convert_attribute_value_list)
        return attributeValues

    } catch (error) {
        return null
    }
}
const allAttributeValue = async ({ attribute_id }) => {
    try {
        const attributeValues = await AttributeValueModel.find({ attribute_id }).lean()
        return attributeValues
    } catch (error) {
        return null
    }
}
const findAttributeValueById = async ({ value_id }) => {
    try {
        const attributeValues = await AttributeValueModel.findOne({ _id: value_id }).lean()
        return attributeValues
    } catch (error) {
        return null
    }
}



module.exports = {
    allAttributeValue, newAttributeValue, findAttributeValueById
}