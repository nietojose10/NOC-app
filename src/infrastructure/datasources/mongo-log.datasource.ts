import { LogModel } from "../../data/mongo";
import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";


export class MongoLogDatasource implements LogDatasource {

    async saveLog(log: LogEntity): Promise<void> {
        const newLog = await LogModel.create(log);
        // await newLog.save();
        console.log('Mongo Log created:', newLog.id );
    }
    
    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        
        const logs = await LogModel.find({
            level: severityLevel
        });

        //!This is not permitted because this is not a Log Entity(It is a Mongo Log Model) even looks similar it does not have
        //!Methods or Properties that Log Entity has.
        // return logs;
        // return logs.map( mongoLog => LogEntity.fromObject(mongoLog) );
        //* When we have a unique argument passing to the function we are invoking, we can just make a reference
        //* of the function.
        return logs.map( LogEntity.fromObject );
    }

}