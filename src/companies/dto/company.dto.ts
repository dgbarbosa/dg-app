import { z } from 'zod';

export const companySchema = z.object({
  id: z.number().int().positive(),
  corporateName: z.string(),
  companyIdentifier: z.string(),
});

export type CompanyDto = z.infer<typeof companySchema>;
