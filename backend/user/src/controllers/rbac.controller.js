
"use strict";

const RbacService = require('../services/rbac.service');
const { successResponse } = require('../core');
class RbacController {

    newRole = async (req, res, next) => {
        return new successResponse.SuccessResponse({
            message: "created role",
            metaData: await RbacService.createRole(req.body)
        }).send(res)
    }
    newResource = async (req, res, next) => {
        return new successResponse.SuccessResponse({
            message: "resource",
            metaData: await RbacService.createResource(req.body)
        }).send(res)
    }
    resourceList = async (req, res, next) => {
        return new successResponse.SuccessResponse({
            message: "resourceList",
            metaData: await RbacService.resourceList(req.body)
        }).send(res)
    }
    roleList = async (req, res, next) => {
        return new successResponse.SuccessResponse({
            message: " role list",
            metaData: await RbacService.roleList(req.body)
        }).send(res)
    }


}

module.exports = new RbacController