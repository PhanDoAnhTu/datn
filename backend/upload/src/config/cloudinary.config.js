'use strict'

const cloudinary = require('cloudinary')

cloudinary.config({
    cloud_name: "shopoutrunner",
    api_key: "165385557458712",
    api_secret: process.env.CLOUDINARY_API_SECRET
})

module.exports = cloudinary