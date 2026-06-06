import { z } from "zod";

export const approvalActionSchema = z.object({
  remarks: z.string().min(1, "Remarks are required").max(500, "Remarks too long"),
});

export type ApprovalActionInput = z.infer<typeof approvalActionSchema>;
