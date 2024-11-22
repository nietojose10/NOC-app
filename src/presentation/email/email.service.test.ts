import { EmailService, SendMailOptions, Attachment } from './email.service';
import nodemailer from 'nodemailer';


describe('email.service', () => { 

    const mockSendMail = jest.fn();

    //Mocking createTranport
    nodemailer.createTransport = jest.fn().mockReturnValue({
        sendMail: mockSendMail,
    });

    const emailService = new EmailService();

    beforeEach(()=> {
        jest.clearAllMocks();
    })

    test('should send email', async() => { 


        const options: SendMailOptions = {
            to: 'josenieto@gmail.com',
            subject: 'Test',
            htmlBody: '<h1>Test</h1>',
        };

        //*We can do this way if we set up our mail with the needed key.
        // const emailSent = await emailService.sendEmail( options );
        // console.log(emailSent);
        // expect( emailSent ).toBeTruthy();

        await emailService.sendEmail( options );

        expect( mockSendMail ).toHaveBeenCalledWith({
            attachments: expect.any(Array),
            html: "<h1>Test</h1>",
            subject: "Test",
            to: "josenieto@gmail.com",
        });

    });

    test('should send email with attachments', async() => { 

        const email = 'josenieto@gmail.com';
        await emailService.sendEmailWithFileSystemLogs(email);

        expect( mockSendMail ).toHaveBeenCalledWith({
            to: email,
            subject: 'Logs del servidor',
            html: expect.any(String),
            attachments: expect.any(Array),
        });

    });

});