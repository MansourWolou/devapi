import nodemailer from "nodemailer"

const MAILDEV_CONF = {
    host:'maildev',
    port:1025,
    ignoreTLS: true
};

const PROD_CONF = {
    name:process.env.SMTP_SERVER_NAME,
    port: process.env.SMTP_PORT,
    host: process.env.SMTP_HOST,
    auth: {
        user: process.env.SMTP_USER,
        pass:process.env.SMTP_PASSWORD
    }
};

const options = process.env.NODE_ENV === "developement" ? MAILDEV_CONF:PROD_CONF;

const transporter =  nodemailer.createTransport(options);

export default transporter