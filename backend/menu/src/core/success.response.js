'use strict'
const StatusCode = {
    OK: 200,
    CREATED: 201
}
const ReasonStatusCode = {
    ok: 'Success',
    CREATED: 'Created'
}
class SuccessResponse {
    constructor({ message, statusCode = StatusCode.OK, reasonStatusCode = ReasonStatusCode.ok, metaData = {} }) {

        this.message = !message ? reasonStatusCode : message
        this.status = statusCode
        this.metaData = metaData
    }
    send(res, headers = {}) {
        return res.status(this.status).send(this)
    }
}

class OK extends SuccessResponse {
    constructor({ message, metaData }) {
        super({ message, metaData });
    }
}
class CREATED extends SuccessResponse {
    constructor({ option = {}, message, statusCode = StatusCode.CREATED, reasonStatusCode = ReasonStatusCode.CREATED, metaData }) {
        super({ message, statusCode, reasonStatusCode, metaData })
        this.option = option
    }
}

module.exports = {
    SuccessResponse,
    OK,
    CREATED,
}