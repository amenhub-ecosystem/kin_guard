import { z } from "zod";

export const CareCircleDetailsSchema = z
  .object({
    circleName: z.string(),
    lovedOneName: z.string(),
    relationship: z.string(),
    age: z.string(),
    gender: z.string(),
    phone: z.string(),
    email: z.string(),
    medication: z.string(),
    dailyCheckIns: z.string(),
    photo: z.string().optional(),
  })
  .strict();
export type CareCircleDetails = z.infer<typeof CareCircleDetailsSchema>;

export const CreateCareCircleResponseSchema = z
  .object({
    careCircle: CareCircleDetailsSchema,
  })
  .strict();
export type CreateCareCircleResponse = z.infer<typeof CreateCareCircleResponseSchema>;
