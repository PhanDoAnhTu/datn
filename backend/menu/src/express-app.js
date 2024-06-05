const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const compression = require('compression');
const { default: helmet } = require('helmet');
const cookieParser = require("cookie-parser");
const routes = require('./routes');


module.exports = async (app,channel) => {

    app.use(cors());
    app.use(morgan("dev"));
    app.use(helmet());
    app.use(compression());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());
    app.use(express.static(__dirname + '/public'))

    routes(app,channel)

    app.use((error, req, res, next) => {
        const statusCode = error.status || 500
        return res.status(statusCode).json(
            {
                status: 'error',
                code: statusCode,
                message: error.message || 'Internal Server Error'
            }
        )

    })

}
