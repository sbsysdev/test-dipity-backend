import { Express, Router } from 'express';
import { inject, injectable } from 'inversify';
import {
    SignInController,
    SignUpController,
} from '../../../contexts/authentication/infrastructure/controllers';
import { Symbols } from '../../../env';
import { Routes } from '../../../types';

@injectable()
export class AuthenticationRoutes implements Routes<Express> {
    private router = Router();

    constructor(
        @inject(Symbols.SignUpController) private signUpController: SignUpController,
        @inject(Symbols.SignInController) private signInController: SignInController
    ) {}

    configure(app: Express, path: string): void {
        this.router.post('/sign-up', (req, res) => this.signUpController.execute(req, res));
        this.router.post('/sign-in', (req, res) => this.signInController.execute(req, res));

        app.use(path, this.router);
    }
}
