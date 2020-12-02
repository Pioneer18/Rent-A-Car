/**
 * **summary**: Interface for the mail options for the gmail NodeMailer
 */
export interface MailOptionsInterface {
    from: string;
    to: string;
    subject: string;
    text: string;
    html: string;
}
