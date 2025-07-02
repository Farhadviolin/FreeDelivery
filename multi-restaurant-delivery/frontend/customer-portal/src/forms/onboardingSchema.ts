import { z } from 'zod';

export const onboardingSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(8),
  address: z.string().min(5),
  geo: z.object({ lat: z.number(), lng: z.number() }),
  documents: z.array(z.instanceof(File)).min(1),
});
export type OnboardingData = z.infer<typeof onboardingSchema>;
