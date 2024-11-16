
//* With abstract we do not allow developers create instances or this class declared as abstract
//* const logdata = new LogDatasource(); => this is not allow with a abstract class
//* An abstract class allow us to define the behaviour of other classes through this abstract class.

import { LogEntity, LogSeverityLevel } from "../entities/log.entity";

//* Any class that implements LogDataSource wil have to have what is define in the abstract class.
export abstract class LogDatasource {
    //* Here we define an method as abstract which means that it does not have any implementation here.
    //* It's just to let them know to other classes what it is need, so that if any subclass extending 
    //* LogDataSource must provide a concrete implementation of saveLog.
    //* In this method declaration we use colon to indicate that "saveLog" method will return
    //* Promise<void>, this only applies when we work with classes.
    //* When we work with functions we can declare within an 
    //* interface saveLog: ( log: LogEntity ) => Promise<void>
    abstract saveLog( log: LogEntity): Promise<void>;
    abstract getLogs( severityLevel: LogSeverityLevel ): Promise<LogEntity[]>;
}