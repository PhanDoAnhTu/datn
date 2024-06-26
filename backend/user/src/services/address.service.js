"use strict";

const { Types } = require("mongoose");
const { errorResponse } = require("../core");
const { addressRepository } = require("../database");
const { AddressModel, CustomerModel } = require("../database/models");

class AddressService {
  constructor() {
    this.repository = new addressRepository();
  }

  async CreateAddress({
    customer_id,
    phone_number,
    customer_name,
    street,
    postalCode,
    city,
    country,
    isDefault = false,
  }) {
    const profile = await CustomerModel.findOne({ _id: customer_id }).lean();

    if (!profile) throw errorResponse.NotFoundRequestError("profile not found");

    const newAddress = await AddressModel.create({
      customer_id,
      phone_number,
      street,
      postalCode,
      city,
      country,
      customer_name,
      isDefault,
    });
    if (!newAddress) {
      return null;
    }
    return await AddressModel.find({ customer_id: customer_id });
  }
  async getAddressByCustomerId({ customer_id }) {
    const Addresses = await AddressModel.find({ customer_id: customer_id });

    return Addresses;
  }
  async getAddressByCustomerIdAndIsDefault({ customer_id, isDefault = true }) {
    const Addresses = await AddressModel.findOne({
      customer_id: customer_id,
      isDefault: isDefault,
    });

    return Addresses;
  }
  async removeAddress({ customer_id, address_id }) {
    await AddressModel.deleteOne({ customer_id: customer_id, _id: address_id });
    return await AddressModel.find({ customer_id: customer_id });
  }
  async isDefaultAddress({ customer_id, address_id, isDefault }) {
    await AddressModel.updateOne(
      { customer_id: customer_id, isDefault: true },
      { isDefault: false }
    );
    await AddressModel.updateOne(
      { customer_id: customer_id, _id: address_id },
      { isDefault: isDefault }
    );
    return await AddressModel.find({ customer_id: customer_id });
  }
}

module.exports = AddressService;
