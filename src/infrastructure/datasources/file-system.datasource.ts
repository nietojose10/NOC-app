import fs from 'fs';
import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';

//! we usually use "extends" when a class inherint from another and "implements" when
//! a class implements an interface but in this specific case LogDatasource is an
//! abstract class and these ones are similar to interfaces which can declare methods
//! without implement them.
//! As advantage for abstract classes is that you can implement methods as well and use them
//! As default methods
export class FileSystemDatasource implements LogDatasource {

    private readonly logPath = 'logs/';
    private readonly allLogsPath = 'logs/logs-all.log';
    private readonly mediumLogsPath = 'logs/logs-medium.log';
    private readonly highLogsPath = 'logs/logs-high.log';

    constructor() {
        //* We are calling this method when we are gonna create an instance of this class.
        this.createLogsFiles();
    }

    //* We use the keyword "private" to make this method available just inside the class
    private createLogsFiles = () => {
        if ( !fs.existsSync( this.logPath ) ) {
           fs.mkdirSync( this.logPath );
        }

        [
            this.allLogsPath,
            this.mediumLogsPath,
            this.highLogsPath,
        ].forEach( path => {
            if ( fs.existsSync( path ) ) return;
            //* We insert an empty file.
            fs.writeFileSync( path, '' );
        })
    }

    //*Here is where we make the implementation of our datasource.
    //*This is the only place where we will get to the database.
    async saveLog(newLog: LogEntity): Promise<void> {
        
        const logAsJson = `${ JSON.stringify(newLog) }\n`;

        //*This method record a new line of content at the end of the file.
        fs.appendFileSync( this.allLogsPath, logAsJson );

        if ( newLog.level === LogSeverityLevel.low ) return;

        if ( newLog.level === LogSeverityLevel.medium ) {
            fs.appendFileSync( this.mediumLogsPath, logAsJson );
        } else {
            fs.appendFileSync( this.highLogsPath, logAsJson );
        }

    }

    private getLogsFromFile = ( path: string ): LogEntity[] => {
        const content = fs.readFileSync( path, 'utf-8');
        // const logs = content.split('\n').map( log => LogEntity.fromJson(log) );
        //* This is a short wat of the map
        const logs = content.split('\n').map( LogEntity.fromJson );

        return logs;
    }

    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        
        switch( severityLevel ) {
            case LogSeverityLevel.low:
                return this.getLogsFromFile(this.allLogsPath);
            
            case LogSeverityLevel.medium:
                return this.getLogsFromFile(this.mediumLogsPath);
            
            case LogSeverityLevel.high:
                return this.getLogsFromFile(this.highLogsPath);
            default:
                throw new Error(`${ severityLevel } not implemented`);
            
        }

    }

}