'use strict'
const StatusCode = {
    BAD_REQUEST: 400,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    INTERNAL_ERROR: 500
}
const ReasonStatusCode = {
    BAD_REQUEST: "BAD_REQUEST",
    FORBIDDEN: 'UN_AUTHORISED',
    NOT_FOUND: "NOT_FOUND",
    CONFLICT: 'CONFLICT_ERROR',
    INTERNAL_ERROR: "INTERNAL_ERROR"

}

class ErrorResponse extends Error {
    constructor(message, status) {
        super(message)
        this.status = status
    }
}

class ConflictRequestError extends ErrorResponse {
    constructor(message = ReasonStatusCode.CONFLICT, statusCode = StatusCode.CONFLICT) {
        super(message, statusCode);
    }
}
class ForbiddenRequestError extends ErrorResponse {
    constructor(message = ReasonStatusCode.FORBIDDEN, statusCode = StatusCode.FORBIDDEN) {
        super(message, statusCode);
    }
}
class BadRequestError extends ErrorResponse {
    constructor(message = ReasonStatusCode.BAD_REQUEST, statusCode = StatusCode.BAD_REQUEST) {
        super(message, statusCode);
    }
}
class NotFoundRequestError extends ErrorResponse {
    constructor(message = ReasonStatusCode.NOT_FOUND, statusCode = StatusCode.NOT_FOUND) {
        super(message, statusCode);
    }
}
class InternalRequestError extends ErrorResponse {
    constructor(message = ReasonStatusCode.INTERNAL_ERROR, statusCode = StatusCode.INTERNAL_ERROR) {
        super(message, statusCode);
    }
}
module.exports = {
    ErrorResponse,
    ConflictRequestError,
    NotFoundRequestError,
    BadRequestError,
    ForbiddenRequestError,
    InternalRequestError
}