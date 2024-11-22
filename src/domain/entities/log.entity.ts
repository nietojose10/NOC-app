
export enum LogSeverityLevel {
    low = 'low',
    medium = 'medium',
    high = 'high',
}

export interface LogEntityOptions {
    level: LogSeverityLevel;
    message: string;
    origin: string;
    createdAt?: Date;
}

export class LogEntity {

    public level: LogSeverityLevel; //Enum
    public message: string;
    public createdAt: Date;
    public origin: string;

    constructor( options: LogEntityOptions ) {
        const { message, level, origin, createdAt = new Date() } = options;
        this.message = message;
        this.level = level;
        this.createdAt = createdAt;
        this.origin = origin;
    }

    //* This method is known as Factory constructor because when is called, it will return an instance of LogEntity
    //*This method creates and return a LogEntity based on a JSON string
    static fromJson = ( json: string ): LogEntity => {
        json = ( json === '' ) ? '{}' : json;
        const { message, level, createdAt, origin } = JSON.parse(json);

        //!we can add validations here like so:
        // if ( !message ) throw new Error('Message is required');
        // if ( !level ) throw new Error('Level is required');

        const log = new LogEntity({ 
            message, 
            level,
            createdAt: new Date(createdAt),
            origin
        });
        // log.createdAt = new Date(createdAt);

        return log;
    }

    //*Transforming an Object with similar properties of a LogEntity to a LogEntity object
    static fromObject = ( object: { [key: string]: any } ): LogEntity => {
        
        const { message, level, createdAt, origin } = object;
        const log = new LogEntity({
            message, level, createdAt, origin
        });

        return log;
    }
}