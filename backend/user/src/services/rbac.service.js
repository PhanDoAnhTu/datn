'use strict'

const { ResourceModel, RoleModel } = require("../database/models")

const createResource = async ({ name = 'profile', slug = "p00001", description = "" }) => {
    try {
        const resource = await ResourceModel.create({
            src_name: name,
            src_slug: slug,
            src_description: description
        })
        return resource
    } catch (error) {
        return error
    }

}
const resourceList = async ({
    userId = 0, limit = 30, offset = 0
}) => {
    try {
        const resources = await ResourceModel.aggregate([
            {
                $project: {
                    _id: 0,
                    name: '$src_name',
                    slug: '$src_slug',
                    description: '$src_discription',
                    resourceId: '$_id',
                    createdAt: -1
                }
            }
        ])

        return resources
    } catch (error) {
        return []
    }
}
const createRole = async ({ name = 'customer', slug = '', description, grants = [] }) => {
    try {
        const role = await RoleModel.create(
            {

                rol_name: name,
                rol_slug: slug,
                rol_description: description,
                rol_grants: grants,


            }
        )
        return role
    } catch (error) {
        return error
    }

}

const roleList = async ({
    userId = 0, limit = 30, offset = 0, search = ''
}) => {
    try {
        const roles = await RoleModel.aggregate([
            {
                $unwind: '$rol_grants'
            },
            {
                $lookup: {
                    from: "resources",
                    localField: "rol_grants.resource",
                    foreignField: "_id",
                    as: 'resource'
                }
            }, {
                $project: {
                    role: '$rol_name',
                    resource: '$resource.src_name',
                    action: '$rol_grants.actions',
                    attributes: '$rol_grants.attributes'
                }
            }, {
                $unwind: '$action'
            }, {
                $project: {
                    _id: 0,
                    role: 1,
                    resource: 1,
                    action: '$action',
                    attributes: 1
                }
            }
        ])
        // const productResponse = await RPCRequest("PRODUCT_RPC", {
        //     type: "VIEW_PRODUCTS",
        //     data: {"limit": 50, "skip": 0},
        // });
        // console.log(productResponse)
        return roles
    } catch (error) {
        return []
    }
}

module.exports = {
    createResource, createRole, resourceList, roleList
}