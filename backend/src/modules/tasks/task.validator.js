import z from "zod";

export const createTaskSchema = z
  .object({
    title: z.string().trim().min(3, "Title must be a non-empty string"),
    completed: z.boolean().optional(),
    categoryId: z.number().int().positive().nullable().optional(),
  })
  .strict();

export const updateTaskSchema = z
  .object({
    title: z
      .string()
      .trim()
      .min(3, "Title must be a non-empty string")
      .optional(),
    completed: z.boolean().optional(),
    categoryId: z.number().int().positive().nullable().optional(),
  })
  .strict();
