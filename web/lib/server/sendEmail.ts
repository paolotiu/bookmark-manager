import nodemailer from 'nodemailer';
import { MailOptions } from 'nodemailer/lib/json-transport';

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
});

export const sendEmail = (opts: MailOptions) => {
    return transporter.sendMail(opts);
};
