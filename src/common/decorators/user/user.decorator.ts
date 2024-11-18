import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export type User = {
  id: number;
  username: string;
  iat: number;
  exp: number;
};

export const User = createParamDecorator(
  (_: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    return request.user;
  },
);
