import { z } from 'zod';

export const PhoneSchema = z.object({
  id: z.string().min(1, { message: 'ID is required' }),
  brand: z.string().min(1, { message: 'Brand is required' }).trim(),
  name: z.string().min(1, { message: 'Name is required' }).trim(),
  basePrice: z.number().positive({ message: 'Base price must be positive' }),
  imageUrl: z
    .string()
    .url({ message: 'Image URL must be valid' })
    .min(1, { message: 'Image URL is required' }),
});

export const PhoneArraySchema = z.array(PhoneSchema);

export type Phone = z.infer<typeof PhoneSchema>;
