import { LogEntity, LogSeverityLevel } from "../entities/log.entity";
import { LogDatasource } from "./log.datasource";

describe('Test in log.datasource.test.ts', () => { 

    const newLog = new LogEntity({
        origin: 'log.datasource.test.ts',
        message: 'test-message',
        level: LogSeverityLevel.low
    });

    //*Creating a mock of the abstract class
    class MockLogDatasource implements LogDatasource {
        
        async saveLog(log: LogEntity): Promise<void> {
            return;
        }

        async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
            return [newLog];
        }

    }

    test('should test the abstract class', async() => { 

        //!We cannot create a instance of an abstract class
        // const logDatasource = new LogDatasource();
        const mockLogDatasource = new MockLogDatasource();
        
        expect( mockLogDatasource ).toBeInstanceOf( MockLogDatasource );
        expect( typeof mockLogDatasource.saveLog ).toBe( 'function' );
        expect( typeof mockLogDatasource.getLogs ).toBe( 'function' );

        await mockLogDatasource.saveLog( newLog );

        const logs = await mockLogDatasource.getLogs( LogSeverityLevel.high );
        console.log(logs);
        expect( logs ).toHaveLength(1);
        expect( logs[0] ).toBeInstanceOf( LogEntity );

    });

});