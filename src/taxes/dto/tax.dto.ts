import { z } from 'zod';

export const taxSchema = z.object({
  id: z.number().positive(),
  number: z.string(),
  amount: z.number(),
  reportingPeriod: z.string().date(),
  dueDate: z.string().date(),
  rate: z.number(),
  paidAt: z.string().date().optional(),
});

export type TaxDto = z.infer<typeof taxSchema>;
