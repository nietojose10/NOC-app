import { CronJob } from 'cron';

//**When it's an object we can define a interface to type it */
//**When it's just an variable we can create a new type */
type CronTime = string | Date;
type OnTick = () => void;

//**On clean code, if we have more than 3 arguments, we can create an new object and send it as argument */
export class CronService {

    static createJob( cronTime : CronTime, onTick: OnTick ): CronJob {
        const job = new CronJob(
            cronTime,
            onTick,
            null, // onComplete
            true, // start
            'America/Los_Angeles' // timeZone
        );

        // job.start();

        return job;
    }

}