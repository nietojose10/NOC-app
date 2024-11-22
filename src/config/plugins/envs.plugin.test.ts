import { envs } from "./envs.plugin";

describe('env.plugin.test.ts', () => { 
    test('should return env options', () => { 
        
        expect( envs ).toEqual({
            PORT: 3000,
            MAILER_SERVICE: 'gmail',
            MAILER_EMAIL: 'nietojose.se10@gmail.com',
            MAILER_SECRET_KEY: 'geomwnqcwkqjqhhr',
            PROD: true,
            MONGO_URL: 'mongodb://josenieto:123456789@localhost:27018/',
            MONGO_DB_NAME: 'NOC-TEST',
            MONGO_USER: 'josenieto',
            MONGO_PASS: '123456789'
        });

    });

    test('should return error if not found env', async() => {
        jest.resetModules();
        process.env.PORT = 'ABC';
        // console.log(envs);

        try {
            
            await import('./envs.plugin');
            expect(true).toBe(false);

        } catch (error) {
            expect(`${error}`).toContain('"PORT" should be a valid integer');
        }

    });

    
})