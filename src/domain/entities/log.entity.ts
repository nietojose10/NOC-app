
export enum LogSeverityLevel {
    low = 'low',
    medium = 'medium',
    high = 'high',
}

export class LogEntity {

    public level: LogSeverityLevel; //Enum
    public message: string;
    public createdAt: Date;

    constructor( message: string, level: LogSeverityLevel ) {
        this.message = message;
        this.level = level;
        this.createdAt = new Date();
    }

    //* This method is known as Factory constructor because when is called, it will return an instance of LogEntity
    static fromJson = ( json: string ): LogEntity => {
        const { message, level, createdAt } = JSON.parse(json);

        //!we can add validations here like so:
        // if ( !message ) throw new Error('Message is required');
        // if ( !level ) throw new Error('Level is required');

        const log = new LogEntity( message, level );
        log.createdAt = new Date(createdAt);

        return log;
    }
}