/**
 * **summary**: Transporter Interface for the gmail NodeMailer
 */
export interface TransporterInterface {
    host: string;
    secureConnection: boolean; // TLS requires secureConnection to be false
    port: number;
    tls: {
        ciphers: string;
    };
    auth: {
        user: string;
        pass: string;
    };
}
