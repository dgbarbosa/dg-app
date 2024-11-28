import { ZodValidationPipe } from '@common/pipes';
import { Public } from '@decorators';
import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Login, loginSchema } from './dto/login-dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('login')
  async signIn(
    @Body(new ZodValidationPipe(loginSchema)) login: Login,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(login.email, login.password);
  }
}
