import { AuthModule } from './auth.module';

describe('LoginModule', () => {
  let loginModule: AuthModule;

  beforeEach(() => {
    loginModule = new AuthModule();
  });

  it('should create an instance', () => {
    expect(loginModule).toBeTruthy();
  });
});
