import { z } from 'zod';
import { companySchema } from './company.dto';

export const createCompanySchema = companySchema.omit({ id: true }).merge(
  z.object({
    userId: z.number().int().positive().optional(),
  }),
);

export type CreateCompanyDto = z.infer<typeof createCompanySchema>;
