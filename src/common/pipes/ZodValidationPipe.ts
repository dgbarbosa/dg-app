import { BadRequestException, PipeTransform } from '@nestjs/common';
import { ZodSchema } from 'zod';

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: unknown) {
    const { success, error, data } = this.schema.safeParse(value);

    if (!success) {
      throw new BadRequestException({ input: value, error: error.issues });
    }

    return data;
  }
}
