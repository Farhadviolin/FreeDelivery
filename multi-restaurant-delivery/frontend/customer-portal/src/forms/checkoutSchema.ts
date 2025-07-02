import { z } from 'zod';
export const checkoutSchema = z.object({
  name: z.string().min(1),
  address: z.string().min(5),
  email: z.string().email(),
  paymentMethodId: z.string().min(1),
});
export type CheckoutData = z.infer<typeof checkoutSchema>;
