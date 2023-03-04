import express, { json, urlencoded } from 'express';
import cors from 'cors';
import { inject, injectable } from 'inversify';
import { CONSTANTS, Symbols } from '../../env';
import { App } from '../../types';
import { mergeRoutes } from '../../utils';
import { AuthenticationRoutes } from './routes';
import { configureMongoose } from './configs';

@injectable()
export class Api implements App {
    private app = express();
    private apiPathV1 = mergeRoutes('/', CONSTANTS.MICROSERVICE, '/api/v1');

    constructor(
        @inject(Symbols.AuthenticationRoutes) private authenticationRoutes: AuthenticationRoutes
    ) {
        configureMongoose();

        this.configure();
        this.routes();
    }

    private configure(): void {
        this.app.set('trust proxy', true);
        this.app.disable('x-powered-by');

        this.app.use(json());
        this.app.use(urlencoded({ extended: true }));

        this.app.use(cors({ origin: '*' }));
    }

    private routes(): void {
        this.authenticationRoutes.configure(this.app, mergeRoutes(this.apiPathV1, '/auth'));
    }

    run(): void {
        this.app.listen(CONSTANTS.PORT);
    }
}
