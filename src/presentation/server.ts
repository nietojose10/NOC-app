import { CheckService } from '../domain/use-cases/checks/check-service';
import { FileSystemDatasource } from '../infrastructure/datasources/file-system.datasource';
import { LogRepositoryImpl } from '../infrastructure/repositories/log.repository.impl';
import { CronService } from './cron/cron-service';

//* The aim of this implementation is that we have different places where to save our info but
//* They will work exactly the same as we want because of this implementation.
const fileSystemLogRepository = new LogRepositoryImpl(
    new FileSystemDatasource(),
    //* Eventually we will have other instances of our different data sources over here.
    // new OracleDataSource(),
    // new mongodbDataSource()
);
//* if we want to save it in AWS we can create another instance of LogRepositoryImpl()

//*Under the hood cronservice is child processes which are processes that run outside the main thread
//*and independent of the app's core.
export class Server {

    //!Remember that if we do not add public/private in our method, this implicitly is gonna be public
    //!Static allow us to use our methods without need to create an instance of the class.
    public static start() {
        console.log('Server started...');

        CronService.createJob(
            '*/5 * * * * *',
            () => {
                const url = 'https://google.com';
                // const url = 'http://localhost:3000/';
                //*Here we call our use-case
                new CheckService(
                    fileSystemLogRepository,
                    () => console.log(`${ url } is okay`),
                    ( error ) => console.log( error ),
                ).execute( url );
                // new CheckService().execute('http://localhost:3000/');

            }
        );

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