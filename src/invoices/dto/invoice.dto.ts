import { z } from 'zod';

export const invoiceSchema = z.object({
  id: z.number().int().positive(),
  number: z.string(),
  amount: z.number(),
  description: z.string().optional(),
  issuedAt: z.string().datetime(),
  verificationCode: z.string(),
});
