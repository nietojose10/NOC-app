
import { PrismaClient } from '@prisma/client';
import { envs } from './config/plugins/envs.plugin';
import { MongoDatabase } from './data/mongo';
import { Server } from './presentation/server';


(async() => {
    main();
})();

async function main(){
    //*With this way we avoid hidden dependencies
    await MongoDatabase.connect({
        mongoUrl: envs.MONGO_URL,
        dbName: envs.MONGO_DB_NAME
});

// Create a colection and documents.
// const newLog = await LogModel.create({
//     message: 'Test message from Mongo',
//     origin: 'App.ts',
//     level: 'low',
// });

// await newLog.save();
// console.log(newLog);
// const logs = await LogModel.find();
// console.log(logs);

// const prisma = new PrismaClient();
// const newLog = await prisma.logModel.create({
//     data: {
//         level: 'HIGH',
//         message: 'Test Message',
//         origin: 'App.ts'
//     }
// });

// const logs = await prisma.logModel.findMany({
//     where: {
//         level: 'HIGH'
//     }
// });

// console.log(logs);

    Server.start();
    // console.log( envs );
}