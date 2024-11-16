import { LogEntity, LogSeverityLevel } from "../entities/log.entity";

//* One advantage of use abstract classes instead of interfaces is that these ones can have method implementation
//* meanwhile, interfaces can only define the structure of the methods/variables
//* This means we can create a default implementation for some methods in the abstract class, and then
//* allow other classes extending LogRepository override those methods if is needed
export abstract class LogRepository {
    abstract saveLog( log: LogEntity): Promise<void>;
    abstract getLogs( severityLevel: LogSeverityLevel ): Promise<LogEntity[]>;
}