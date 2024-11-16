import { LogDatasource } from '../../domain/datasources/log.datasource';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';
import { LogRepository } from '../../domain/repository/log.repository';


export class LogRepositoryImpl implements LogRepository {

    constructor ( 
        //* This way is the same as we do creating a private variable and 
        //* then use this.logDatasource = logDatasource
        //! Remember this is a dependency injection
        private readonly logDatasource: LogDatasource,
    ){

    }

    async saveLog(log: LogEntity): Promise<void> {
        this.logDatasource.saveLog( log );
    }

    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        return this.logDatasource.getLogs( severityLevel );
    }

}