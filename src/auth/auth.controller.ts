import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ZodValidationPipe } from '@common/pipes';
import { LoginDto, loginDtoSchema } from './dto/login-dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async signIn(
    @Body(new ZodValidationPipe(loginDtoSchema)) login: LoginDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(login.email, login.password);
  }
}
