'use strict'

const { errorResponse } = require("../core")
const { roleList } = require("../services/rbac.service")
const rbac = require('./role')

const grantAccess = (action, resource) => {
    return async (req, res, next) => {
        try {
            
            rbac.setGrants(await roleList({
                userId: 111
            }))
            const rol_name = req.query.role
            const permission = rbac.can(rol_name)[action](resource)
            if (!permission.granted) throw new errorResponse.ForbiddenRequestError("you don't have enough permission...")
            next()
        } catch (error) {
            next(error)
        }
    }
}
module.exports = {
    grantAccess
}