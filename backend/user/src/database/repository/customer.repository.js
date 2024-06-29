"use strict";

const { CustomerModel } = require('../models');

//Dealing with data base operations
class CustomerRepository {

    async findByEmail(customer_email) {
        const existingCustomer = await CustomerModel.findOne({ customer_email }).lean()
        return existingCustomer;
    }
    async findcustomerByIdAndProvider({ customer_account_id, customer_provider }) {
        const customer = await CustomerModel.findOne({ customer_account_id: customer_account_id, customer_provider: customer_provider }).lean()
        return customer
    }
    async createCustomer({ customer_email, customer_name, customer_password }) {
        console.log(customer_email, customer_name, customer_password)
        const customer = await CustomerModel.create({
            customer_email, customer_name, customer_password, customer_status: "active"
        })
        console.log(customer)
        return customer
    }
    async createCustomerWithSocial({ customer_account_id, customer_provider, customer_avatar, customer_email, customer_name }) {
        const customer = await CustomerModel.create({
            customer_account_id, customer_provider, customer_avatar, customer_email, customer_name, customer_status: "active"
        })
        console.log(customer)
        return customer
    }

}

module.exports = CustomerRepository;
