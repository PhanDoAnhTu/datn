"use strict";


const { addressRepository } = require('../database');

class AddressService {

    constructor() {
        this.repository = new addressRepository();
    }

    async CreateAddress({ customer_id, phone_number, street, postalCode, city, country }) {

        const profile = await CustomerModel.findOne({ customer_id: customer_id });

        if (!profile) return null

        const newAddress = await AddressModel.create({
            customer_id,
            phone_number,
            street,
            postalCode,
            city,
            country
        })
        return newAddress
    }
    async getAddressByCustomerId({ customer_id }) {

        const Addresses = await AddressModel.find({ customer_id: customer_id });

        return Addresses
    }
    async removeAddress({ customer_id, address_id }) {

        const address = await AddressModel.findOne({ customer_id: customer_id, _id: address_id });

        if (!address) return null

        return await AddressModel.deleteOne({ _id: address._id })
    }


}

module.exports = AddressService;
