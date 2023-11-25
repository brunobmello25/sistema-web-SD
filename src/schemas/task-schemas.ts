import { z } from "zod";

export const createTaskSchema = {
  body: z.object({
    title: z.string()
  })
};

export const updateTaskSchema = {
  body: z.object({
    title: z.string(),
    done: z.boolean()
  }),
  params: z.object({
    taskId: z.number()
  })
};

export const deleteTaskSchema = {
  params: z.object({
    taskId: z.number()
  })
};
