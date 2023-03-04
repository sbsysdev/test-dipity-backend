/* imports */
import 'dotenv/config';

export type Environment = 'development' | 'production' | 'testing';

export const CONSTANTS = {
    /* application */
    ENVIRONMENT: (process.env['ENVIRONMENT'] ?? 'development') as Environment,
    PORT: process.env['PORT'] ?? '8080',
    MICROSERVICE: process.env['MICROSERVICE'] ?? 'ms',
    /* mongodb */
    DB_USER: process.env['DB_USER'],
    DB_PASSWORD: process.env['DB_PASSWORD'],
    DB_CLUSTER: process.env['DB_CLUSTER'],
    DB_NAME: process.env['DB_NAME'],
    /* jwt */
    JWT_KEY: process.env['JWT_KEY'] ?? 'password',
};
