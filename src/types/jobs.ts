import { z } from "zod";

export const CreateJobSchema = z.object({
  title: z.string().min(1).max(255),
  company: z.string().min(1).max(255),
  location: z.string().min(1).max(255),
  salary: z.number().optional(),
  description: z.string().min(1),
});

export const UpdateJobSchema = CreateJobSchema.partial();

export type CreateJobDto = z.infer<typeof CreateJobSchema>;
export type UpdateJobDto = z.infer<typeof UpdateJobSchema>;
