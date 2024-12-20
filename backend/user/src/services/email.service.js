"use strict";

const transport = require("../database/nodemailer");
const { replacePlaceholder } = require("../utils");
const TemplateService = require("./template.service");

const sendEmailLinkVerify = async ({ html, toEmail, subject = "Xác nhận Email", text = "..." }) => {
    try {
        const mailOption = {
            from: `"OUTRUNNER STORE" <phandoanhtu0291@gmail.com>`,
            to: toEmail,
            subject: subject,
            text,
            html
        }
        transport.sendMail(mailOption, (err, info) => {
            if (err) {
                return console.log(err)
            }
            // console.log("message sent :: ", info.messageId)
        })
    } catch (error) {
        console.log(error);
        return error
    }

}



const sendEmailToken = async ({ user_email, token }) => {
    try {
        const template = await TemplateService.getTemplate({
            tem_name: "HTML EMAIL TOKEN"
        })
        if (!template) {
            return console.log("not found tem")
        }
        // console.log("otp_token", token.otp_token)
        const content = replacePlaceholder(template.tem_html, { link_verify: `http://localhost:5000/api/user/v1/customer/welcome?token=${token.otp_token}`, user_email: user_email, store_name: "OUTRUNNER STORE", button_text: "Verify Email" })

        sendEmailLinkVerify({
            html: content,
            toEmail: user_email,
            subject: "Vui lòng xác nhận địa chỉ email đăng ký"
        }).catch(error =>
            console.log(error)
        )
        return 1
    } catch (error) {
        return null
    }

}


const sendEmailOTP = async ({ user_email, otp }) => {
    try {
        const template = await TemplateService.getTemplate({
            tem_name: "HTML EMAIL TOKEN"
        })
        if (!template) {
            return console.log("not found tem")
        }
        // console.log("otp_token", token.otp_token)
        const content = replacePlaceholder(template.tem_html, { link_verify: `#`, user_email: user_email, store_name: "OUTRUNNER STORE", button_text: otp })

        sendEmailLinkVerify({
            html: content,
            toEmail: user_email,
            subject: "OTP Xác nhận Email"
        }).catch(error =>
            console.log(error)
        )
        return 1
    } catch (error) {
        return null
    }

}
module.exports = {
    sendEmailToken,
    sendEmailLinkVerify,
    sendEmailOTP
}