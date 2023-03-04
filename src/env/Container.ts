import 'reflect-metadata';
import { Container } from 'inversify';
import { Symbols } from './Symbols';
/* serializers */
import { UserSerializer } from '../contexts/authentication/infrastructure/serializers';
/* repositories */
import { UserRepository } from '../contexts/authentication/domain/user';
import { MongooseUserRepository } from '../contexts/authentication/infrastructure/repositories';
/* use cases */
import { SignInUseCase, SignUpUseCase } from '../contexts/authentication/application/commands';
/* handlers */
/* controllers */
import {
    SignInController,
    SignUpController,
} from '../contexts/authentication/infrastructure/controllers';
/* routes */
import { AuthenticationRoutes } from '../apps/api/routes';
/* apps */
import { Api } from '../apps';

const container = new Container();
/* serializers */
container.bind<UserSerializer>(Symbols.UserSerializer).to(UserSerializer);
/* repositories */
container.bind<UserRepository>(Symbols.UserRepository).to(MongooseUserRepository);
/* use cases */
container.bind<SignUpUseCase>(Symbols.SignUpUseCase).to(SignUpUseCase);
container.bind<SignInUseCase>(Symbols.SignInUseCase).to(SignInUseCase);
/* handlers */
/* controllers */
container.bind<SignUpController>(Symbols.SignUpController).to(SignUpController);
container.bind<SignInController>(Symbols.SignInController).to(SignInController);
/* routes */
container.bind<AuthenticationRoutes>(Symbols.AuthenticationRoutes).to(AuthenticationRoutes);
/* apps */
container.bind<Api>(Symbols.Api).to(Api);

export { container };
