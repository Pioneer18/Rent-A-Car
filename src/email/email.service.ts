import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as smtpTransport from 'nodemailer-smtp-transport';
import { MailOptionsInterface } from './interface/mailoptions.interface';
import { TransporterInterface } from './interface/transporter.interface';
/**
 * Email Service
 */
@Injectable()
export class EmailService {
    constructor() {}


    async createTransporter (): Promise<TransporterInterface> {
        const transporter: TransporterInterface = nodemailer.createTransport({
            service: 'gmail', 
            auth: {
                user: 'rentacar.team2020@gmail.com',
                pass: 'Unathi2020!'
            }
        })
        return transporter;
    }

    /**
     * @param email user's email
     */
    async createMailOptions (email: string): Promise<MailOptionsInterface> {
        const mailOptions: MailOptionsInterface = {
            from: 'rentacar.team2020@gmail.com',
            to: email,
            subject: 'Reset Forgotten Email Password for Rent-A-Car',
            text: 'Please select the reset email link to reset your password',
            html: '<h1>Rent-A-Car Password Reset</h1><br><p>please select the reset email link to reset your passowrd</p>'
        }
        return mailOptions;
    }

    async sendMail(mailOptions, sender): Promise<any> {
        try{
            sender.sendMail(mailOptions);
        } catch(err) {
            throw new Error(err);
        }
    }
}