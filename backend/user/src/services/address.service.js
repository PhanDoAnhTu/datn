"use strict";


const {addressRepository} = require('../database');

class AddressService {

    constructor() {
        this.repository = new addressRepository();
    }

    async AddNewAddress(_id, userInputs) {

        const { street, postalCode, city, country, phone_number } = userInputs;

        const addressResult = await this.repository.CreateAddress({ _id, street, postalCode, city, country, phone_number })

        return FormateData(addressResult);
    }

}

module.exports =  AddressService;
