import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as smtpTransport from 'nodemailer-smtp-transport';
/**
 * Email Service
 */
@Injectable()
export class EmailService {
    constructor() {}

    // fallback mail options?
    mailOption = {
        from: 'rentacar.team2020@gmail.com',
        to: 'rentacar.team2020@gmail.com',
        subject: 'Reset Forgotten Email Password for Rent-A-Car',
        text: 'Please select the reset email link to reset your password',
        html: '<h1>Rent-A-Car Password Reset</h1><br><p>please select the reset email link to reset your passowrd</p>'
    }
    
    transporter = nodemailer.createTransport({
        host: 'smtp-mail.outlook.com',
        secureConnection: true, // TLS requires secureConnection to be false
        port: 587,
        tls: {
            ciphers: 'SSLv3'
        },
        auth: {
            user: 'rentacar.team2020@gmail.com',
            pass: 'Unathi2020!'
        }
    })

    async createTransporter () {
        // create a transporter from provided info
    }

    async sender(mailOption, sender): Promise<any> {
        try{
            const options = mailOption? mailOption : this.mailOption;
            const mailer = sender? sender: this.transporter;

            return await mailer.sendMail(options);
        } catch(err) {
            throw new Error(err);
        }
    }
}