'use strict';
const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: "phandoanhtu0291@gmail.com",
        pass: "ovsgnpzaedqxyprq"
    }
})

module.exports = transport