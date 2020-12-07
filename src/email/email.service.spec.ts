import { Test, TestingModule } from "@nestjs/testing";
import { EmailService } from "./email.service"
import { CreateMailOptionsInterface } from "./interface/create-mail-options.interface";
import { MailOptionsInterface } from "./interface/mailoptions.interface";

describe('EmailService Unit Test', () => {

    let service: EmailService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                EmailService
            ]
        }).compile()
        service = module.get<EmailService>(EmailService);
    });

    describe('definition test', () => {
        it('should be defined', async () => {
            expect(service).toBeDefined();
        });
    });

    describe('createMailOptions method test', () => {
        const data: CreateMailOptionsInterface = {
            email: 'fake.email@gmail.com'
        };
        const response: MailOptionsInterface = {
            from: 'muffin.man@gmail.com',
            to: 'fake.email@gmail.com',
            subject: 'unit tests :)',
            text: 'Happy Holidays',
            html: "bleeeh"
        }
        it('should crate the mail options to send the email', async () => {
            jest
                .spyOn(service, 'createMailOptions')
                .mockImplementation(async () => response)
            expect(await service.createMailOptions(data)).toBe(response);
        })
    })

    describe('sendMail', () => {
        const data: MailOptionsInterface = {
            from: 'muffin.man@gmail.com',
            to: 'fake.email@gmail.com',
            subject: 'unit tests :)',
            text: 'Happy Holidays',
            html: "bleeeh"
        }
        const response: any = 'email was sent'
        it('should use the nodemailer transporer to send the email', async () => {
            jest
                .spyOn(service, 'sendMail')
                .mockImplementation(async () => response)
            expect(await service.sendMail(data)).toBe(response)
        })
    })
})