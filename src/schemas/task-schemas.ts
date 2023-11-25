import { z } from "zod";

export const createTaskSchema = {
  body: z.object({
    title: z.string()
  }),
  query: z.object({
    username: z.string()
  })
};

export const updateTaskSchema = {
  body: z.object({
    title: z.string(),
    done: z.boolean()
  }),
  query: z.object({
    username: z.string()
  }),
  params: z.object({
    taskId: z.number()
  })
};
