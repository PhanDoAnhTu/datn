'use strict'
const { AttributeValueModel } = require('../database/models')

const newAttributeValue = async ({
    attribute_id, attribute_value_list
}) => {
    try {
        const convert_attribute_value_list = attribute_value_list.map(attribute => {
            // console.log(`attribute_value_list`)
            return { ...attribute, attribute_id: attribute_id }

        })
        console.log(convert_attribute_value_list)

        const attributeValues = await AttributeValueModel.create(convert_attribute_value_list)
        console.log(attributeValues)
        return attributeValues

    } catch (error) {
        return null
    }
}
const allAttributeValue = async ({ attribute_id }) => { 
    try {
        const attributeValues = await AttributeValueModel.find({ attribute_id }).lean()
        console.log(attributeValues)
        return attributeValues

    } catch (error) {
        return null
    }
}



module.exports = {
    allAttributeValue, newAttributeValue
}