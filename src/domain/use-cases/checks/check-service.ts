
interface CheckServiceUseCase {
    execute( url: string ): Promise<boolean>
}

type SuccessCallback = () => void;
type ErrorCallback = ( error: string ) => void;

export class CheckService implements CheckServiceUseCase{
    //*Dependency Injection
    constructor(
        private readonly successCallback: SuccessCallback,
        private readonly errorCallback: ErrorCallback,
    ){

    }

    public async execute( url: string ):Promise<boolean>{

        try {
            const req = await fetch( url );

            if( !req.ok ){
                //*The idea of this throw error is get the error in the same place so that
                //*This will be got in the catch of this try/catch statement
                throw new Error(`Error on check service ${ url }`);
            }

            this.successCallback();

            return true;
        } catch (error) {
            console.log(`${ error }`);
            this.errorCallback( `${ error }` );
            return false;
        }

    }

}