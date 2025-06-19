import { z } from 'zod';

export const PhoneColorOptionSchema = z.object({
  name: z.string(),
  hexCode: z.string(),
  imageUrl: z.string().url(),
});

export const PhoneStorageOptionSchema = z.object({
  capacity: z.string(),
  price: z.number(),
});

export const SimilarProductSchema = z.object({
  id: z.string(),
  brand: z.string(),
  name: z.string(),
  basePrice: z.number(),
  imageUrl: z.string().url(),
});

export const PhoneSpecsSchema = z.object({
  screen: z.string(),
  resolution: z.string(),
  processor: z.string(),
  mainCamera: z.string(),
  selfieCamera: z.string(),
  battery: z.string(),
  os: z.string(),
  screenRefreshRate: z.string(),
});

export const PhoneDetailSchema = z.object({
  id: z.string(),
  brand: z.string(),
  name: z.string(),
  description: z.string(),
  basePrice: z.number(),
  rating: z.number(),
  specs: PhoneSpecsSchema,
  colorOptions: z.array(PhoneColorOptionSchema),
  storageOptions: z.array(PhoneStorageOptionSchema),
  similarProducts: z.array(SimilarProductSchema),
});

export type PhoneDetail = z.infer<typeof PhoneDetailSchema>;
export type StorageOption = z.infer<typeof PhoneStorageOptionSchema>;
export type ColorOption = z.infer<typeof PhoneColorOptionSchema>;
