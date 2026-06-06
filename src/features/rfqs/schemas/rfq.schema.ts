import { z } from "zod";

export const rfqSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  quantity: z.coerce.number().min(1, "Quantity must be at least 1"),
  deadline: z.string().min(1, "Deadline is required"),
});

export type RfqFormData = z.infer<typeof rfqSchema>;
