export const Symbols = {
    /* serializers */
    UserSerializer: Symbol.for('UserSerializer'),
    /* repositories */
    UserRepository: Symbol.for('UserRepository'),
    /* use cases */
    SignUpUseCase: Symbol.for('SignUpUseCase'),
    SignInUseCase: Symbol.for('SignInUseCase'),
    /* handlers */
    /* controllers */
    SignUpController: Symbol.for('SignUpController'),
    SignInController: Symbol.for('SignInController'),
    /* routes */
    AuthenticationRoutes: Symbol.for('AuthenticationRoutes'),
    /* apps */
    Api: Symbol.for('Api'),
};
