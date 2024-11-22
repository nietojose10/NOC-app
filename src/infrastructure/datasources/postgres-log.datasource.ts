import { PrismaClient, SeverityLevel } from "@prisma/client";
import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

const prismaClient = new PrismaClient();

const severityEnum = {
    low: SeverityLevel.LOW,
    medium: SeverityLevel.MEDIUM,
    high: SeverityLevel.HIGH
};

export class PostgresLogDatasource implements LogDatasource {
    
    async saveLog(log: LogEntity): Promise<void> {

        const level = severityEnum[log.level];
        const newLog = await prismaClient.logModel.create({
            //My implementation
            // data: {
            //     level: log.level.toUpperCase() as SeverityLevel,
            //     message: log.message,
            //     origin: log.origin
            // }
            data: {
                ...log,
                level: level,
            }
        })
        console.log('Postgres Log created:', newLog.id);
    }

    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {

        const level = severityEnum[severityLevel];
        const dbLogs = await prismaClient.logModel.findMany({
            where: {
                //My implementation
                // level: severityLevel.toUpperCase() as SeverityLevel
                level
            }
        })

        return dbLogs.map( LogEntity.fromObject );
    }

}