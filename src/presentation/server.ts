import { envs } from '../config/plugins/envs.plugin';
import { LogSeverityLevel } from '../domain/entities/log.entity';
import { CheckService } from '../domain/use-cases/checks/check-service';
import { CheckServiceMultiple } from '../domain/use-cases/checks/check-service-multiple';
import { SendEmailLogs } from '../domain/use-cases/email/send-email-logs';
import { FileSystemDatasource } from '../infrastructure/datasources/file-system.datasource';
import { MongoLogDatasource } from '../infrastructure/datasources/mongo-log.datasource';
import { PostgresLogDatasource } from '../infrastructure/datasources/postgres-log.datasource';
import { LogRepositoryImpl } from '../infrastructure/repositories/log.repository.impl';
import { CronService } from './cron/cron-service';
import { EmailService } from './email/email.service';

//* The aim of this implementation is that we have different places where to save our info but
//* They will work exactly the same as we want because of this implementation.
const logRepository = new LogRepositoryImpl(
    // new FileSystemDatasource(),
    // new MongoLogDatasource(),
    new PostgresLogDatasource(),
);

const fsLogRepository = new LogRepositoryImpl(
    new FileSystemDatasource(),
);

const mongoLogRepository = new LogRepositoryImpl(
    new MongoLogDatasource(),
);

const postgresLogRepository = new LogRepositoryImpl(
    new PostgresLogDatasource(),
);

const emailService = new EmailService();

//* if we want to save it in AWS we can create another instance of LogRepositoryImpl()

//*Under the hood cronservice is child processes which are processes that run outside the main thread
//*and independent of the app's core.
export class Server {

    //!Remember that if we do not add public/private in our method, this implicitly is gonna be public
    //!Static allow us to use our methods without need to create an instance of the class.
    public static async start() {
        console.log('Server started...');

        //todo: Send email
        // new SendEmailLogs(
        //     emailService,
        //     fileSystemLogRepository
        // ).execute(['nietojose1995@gmail.com', 'josenieto.si10@gmail.com']);
        // emailService.sendEmailWithFileSystemLogs(
        //     ['nietojose1995@gmail.com', 'josenieto.si10@gmail.com']
        // );

        // const logs = await logRepository.getLogs(LogSeverityLevel.low);
        // console.log(logs);

        // //?With checkService
        // CronService.createJob(
        //     '*/5 * * * * *',
        //     () => {
        //         const url = 'https://google.com';
        //         // const url = 'http://localhost:3000/';
        //         //*Here we call our use-case
        //         new CheckService(
        //             logRepository,
        //             () => console.log(`${ url } is okay`),
        //             ( error ) => console.log( error ),
        //         ).execute( url );
        //         // new CheckService().execute('http://localhost:3000/');

        //     }
        // );

        //?With checkServiceMultiple
        // CronService.createJob(
        //     '*/5 * * * * *',
        //     () => {
        //         const url = 'https://google.com';
        //         // const url = 'http://localhost:3000/';
        //         //*Here we call our use-case
        //         new CheckServiceMultiple(
        //             [fsLogRepository, mongoLogRepository, postgresLogRepository],
        //             () => console.log(`${ url } is okay`),
        //             ( error ) => console.log( error ),
        //         ).execute( url );
        //         // new CheckService().execute('http://localhost:3000/');

        //     }
        // );

        //*This is a sample that we can execute the cronService multiple times concurrently
        // CronService.createJob(
        //     '*/2 * * * * *',
        //     () => {
        //         const date = new Date();
        //         console.log('2 seconds', date);
        //     }
        // );

        // CronService.createJob(
        //     '*/3 * * * * *',
        //     () => {
        //         const date = new Date();
        //         console.log('3 seconds', date);
        //     }
        // );


    }
}

//!We have to do this if we do not add static on our method
// const server = new Server();
// server.start()