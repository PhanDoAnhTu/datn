"use strict";

const { AddressModel } = require('../models');

class AddressRepository {

    async CreateAddress({ _id, phone_number, street, postalCode, city, country }) {

        const profile = await CustomerModel.findById(_id);

        if (profile) {

            const newAddress = new AddressModel({
                _id,
                phone_number,
                street,
                postalCode,
                city,
                country
            })

            await newAddress.save();

            profile.address.push(newAddress);
        }

        return await profile.save();
    }


}

module.exports = AddressRepository;