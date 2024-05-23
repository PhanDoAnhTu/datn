
module.exports = {
    databaseConnection: require('./connection'),
    nodemailerTransport: require('./nodemailer'),

    apiKeyRepository: require('./repository/apiKey.repository'),
    keyTokenRepository: require('./repository/keyToken.repository'),
    otpRepository: require('./repository/otp.repository'),
    templateRepository: require('./repository/template.repository'),
    addressRepository: require('./repository/address.repository'),
    customerRepository: require('./repository/customer.repository'),
    staffRepository: require('./repository/staff.repository'),



}