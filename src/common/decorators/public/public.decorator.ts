import { CustomDecorator, SetMetadata } from '@nestjs/common';
import { IS_PUBLIC_KEY } from '@constants';

export const Public = (): CustomDecorator<string> => {
  return SetMetadata(IS_PUBLIC_KEY, true);
};
