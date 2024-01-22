const nodemailer = require('nodemailer')
const dotenv = require("dotenv");
dotenv.config()

class MailService {

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: process.env.TRANSPORTER_EMAIL,
                pass: process.env.TRANSPORTER_PASS,
            },
        })
    }

    async sendActivationEmail(to, link) {
        await this.transporter.sendMail({
            from: process.env.TRANSPORTER_EMAIL,
            to,
            subject: `Activation link for ${process.env.CLIENT_URL}`, // Subject line
            text: "Activate your account before using it!",
            html: `
                <h1>Activation link</h1>
                <a href="${link}">${link}</a>
            `,
        })
    }

}

module.exports = new MailService()
