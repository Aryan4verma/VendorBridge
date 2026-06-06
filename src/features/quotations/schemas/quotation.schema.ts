import { z } from "zod";

export const quotationSchema = z.object({
  price: z.coerce.number().min(1, "Price must be greater than 0"),
  delivery_days: z.coerce.number().min(1, "Delivery days must be at least 1"),
  notes: z.string().optional(),
});

export type QuotationFormData = z.infer<typeof quotationSchema>;
