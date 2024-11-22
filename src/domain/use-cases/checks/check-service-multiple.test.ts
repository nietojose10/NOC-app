import { LogEntity } from "../../entities/log.entity";
import { CheckServiceMultiple } from "./check-service-multiple";

describe('check-service-multiple UseCase', () => {

    const mockFsRepository = {
        saveLog: jest.fn(),
        getLogs: jest.fn(),
    }

    const mockMongoRepository = {
        saveLog: jest.fn(),
        getLogs: jest.fn(),
    }

    const successCallback = jest.fn();
    const errorCallback = jest.fn();

    const checkServiceMultiple = new CheckServiceMultiple(
        [mockFsRepository, mockMongoRepository],
        successCallback,
        errorCallback
    );

    beforeEach( ()=> {
        jest.clearAllMocks();
    });

    test('should call successCallback and return true', async() => { 

        const wasOk = await checkServiceMultiple.execute('https://google.com')
        expect( wasOk ).toBe(true);
        expect( successCallback ).toHaveBeenCalled();
        expect( errorCallback ).not.toHaveBeenCalled();
        expect( mockFsRepository.saveLog ).toHaveBeenCalledWith(
            expect.any( LogEntity )
        )

    });

    test('should call errorCallback and return false', async() => { 

        const wasOk = await checkServiceMultiple.execute('https://asdfgfgoogle.com');

        expect( wasOk ).toBe(false);
        expect( successCallback ).not.toHaveBeenCalled();
        expect( errorCallback ).toHaveBeenCalled();
        expect( mockMongoRepository.saveLog ).toHaveBeenCalledWith(
            expect.any( LogEntity )
        )

    });

});