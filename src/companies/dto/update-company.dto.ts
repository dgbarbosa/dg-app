import { z } from 'zod';
import { companySchema } from './company.dto';

export const updateCompanySchema = companySchema.omit({ id: true });

export type UpdateCompanyDto = z.infer<typeof updateCompanySchema>;
