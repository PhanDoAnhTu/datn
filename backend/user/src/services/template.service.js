"use strict";
const { TemplateModel } = require('../database/models');
const { htmlEmailToken } = require('../utils/tem.html');


class TemplateService {

    newTemplate = async ({ tem_id = 1, tem_name, tem_html = "" }) => {
        const newTem = await TemplateModel.create({ tem_id, tem_name, tem_html: htmlEmailToken })
        return newTem
    }

    getTemplate = async ({ tem_name }) => {
        const template = await TemplateModel.findOne({ tem_name })
        return template
    }


}

module.exports =new TemplateService;
