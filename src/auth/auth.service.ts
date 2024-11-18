import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async signIn(
    username: string,
    password: string,
  ): Promise<{ accessToken: string }> {
    const user = await this.usersService.findByEmail(username);

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException();
    }

    const payload = { id: user.id, username: user.email };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
