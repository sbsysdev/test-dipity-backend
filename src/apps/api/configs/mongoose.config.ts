import mongoose from 'mongoose';
import { CONSTANTS } from '../../../env';

export async function configureMongoose(): Promise<typeof mongoose | undefined> {
    try {
        mongoose.set('strictQuery', false);

        const uri = `mongodb://${CONSTANTS.DB_USER}:${CONSTANTS.DB_PASSWORD}@${CONSTANTS.DB_CLUSTER}/${CONSTANTS.DB_NAME}?authSource=admin`;
        console.log(uri);

        const connection = await mongoose.connect(uri);

        console.log('connected to mongodb');

        return connection;
    } catch (err) {
        console.error(err);
        //throw new Error('No mongodb connection');
    }
}
