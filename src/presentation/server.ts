import { CheckService } from '../domain/use-cases/checks/check-service';
import { CronService } from './cron/cron-service';

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
                const url = 'https://google.com'
                //*Here we call our use-case
                new CheckService(
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