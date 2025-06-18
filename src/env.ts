import { z } from 'zod';

const envSchema = z.object({
  PHONE_CATALOGUE_API_URL: z.string().url(),
  PHONE_CATALOGUE_API_KEY: z.string().min(1, 'Phone Catalogue API key is required'),
  NODE_ENV: z
    .union([z.literal('development'), z.literal('production'), z.literal('test')])
    .default('development'),
});

const env = envSchema.parse(process.env);

export default env;
