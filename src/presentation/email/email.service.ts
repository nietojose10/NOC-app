import nodemailer from 'nodemailer';
import { envs } from '../../config/plugins/envs.plugin';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';

export interface SendMailOptions {
    to: string | string[];
    subject: string;
    htmlBody: string;
    attachments?: Attachment[];
}

export interface Attachment {
    filename: string;
    path: string;
}

//*This is the pattern adapter in OOP/using classes
export class EmailService {

    //*This object is the one which send the email.
    private transporter = nodemailer.createTransport({
        service: envs.MAILER_SERVICE,
        auth: {
            user: envs.MAILER_EMAIL,
            pass: envs.MAILER_SECRET_KEY
        }
    });

    constructor(){
        
    }

    async sendEmail( options: SendMailOptions ): Promise<boolean>{
        
        const { to, subject, htmlBody, attachments = [] } = options;

        try {
            
            const sentInformation = await this.transporter.sendMail({
                to: to,
                subject: subject,
                html: htmlBody,
                attachments: attachments
            });

            // console.log(sentInformation);

            return true;
        } catch (error) {

            return false;
        }
    }

    async sendEmailWithFileSystemLogs( to: string | string[] ) {

        const subject = 'Logs del servidor';
        const htmlBody = `
                    <h3>Logs de sistema - NOC</h3>
                <p>Adipisicing ad quis dolor enim sunt in laborum consectetur. Ex ex consectetur aute cupidatat reprehenderit ea velit labore proident. Nisi in sunt excepteur sint mollit fugiat ea sint quis. Deserunt ut incididunt proident commodo elit nulla officia anim est laboris proident. Et reprehenderit aute incididunt voluptate nulla elit excepteur consectetur velit elit culpa reprehenderit officia in. Consectetur voluptate cillum occaecat nisi tempor Lorem amet nisi consectetur commodo tempor.

                Qui laboris id veniam in esse magna. Laborum labore sint ipsum consectetur magna esse. Aute dolore laborum minim ad proident laborum incididunt irure ipsum est mollit ut. Exercitation excepteur in proident laborum tempor aliqua non. Reprehenderit incididunt laborum eiusmod exercitation esse eiusmod aliquip incididunt culpa dolor nisi.
                </p>
                <p>Ver logs adjuntos</p>
        `;
        const attachments: Attachment[] = [
            { filename: 'logs-all.log', path: './logs/logs-all.log' },
            { filename: 'logs-high.log', path: './logs/logs-high.log' },
            { filename: 'logs-medium.log', path: './logs/logs-medium.log' },
        ];

        return this.sendEmail({
            to, subject, attachments, htmlBody
        });

    }

}