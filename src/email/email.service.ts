import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { MailOptionsInterface } from './interface/mailoptions.interface';
/**
 * **summary**: this email service uses the gmail nodemailer to send emails to the provided email; used to send the forgot password email to registered users
 */
@Injectable()
export class EmailService {
    constructor() {}


    /**
     * **summary**: the gmail nodemailer transporter used to send emails
     */
    private transporter = nodemailer.createTransport( {
        service: 'gmail', 
        auth: {
            user: 'rentacar.team2020@gmail.com',
            pass: 'Unathi2020!'
        }
    })

    /**
     * **summary**: create the mail options to be used to send the email
     * @param email user's email
     */
    createMailOptions = async(email: string): Promise<MailOptionsInterface> => {
        const mailOptions: MailOptionsInterface = {
            from: 'rentacar.team2020@gmail.com',
            to: email,
            subject: 'Reset Forgotten Email Password for Rent-A-Car',
            text: 'Please select the reset email link to reset your password',
            html: '<h1>Rent-A-Car Password Reset</h1><br><p>please select the reset email link to reset your passowrd</p>'
        }
        return mailOptions;
    }

    /**
     * **summary**: use the nodemailer transporter to send the email
     * @param mailOptions 
     */
    sendMail = async(mailOptions): Promise<any> => {
        try{
            this.transporter.sendMail(mailOptions);
        } catch(err) {
            throw new Error(err);
        }
    }
}