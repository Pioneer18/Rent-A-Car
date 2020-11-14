import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as smtpTransport from 'nodemailer-smtp-transport';
/**
 * Email Service
 */
@Injectable()
export class EmailService {
    constructor() {}

    mailOption = {
        from: 'rentacar.team2020@gmail.com',
        to: '[user emai]',
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
}