import { z } from "zod";

const taskId = z.string().regex(/^\d+$/);
const title = z.string();
const done = z.boolean();

export const createTaskSchema = {
  body: z.object({
    title
  })
};

export const updateTaskSchema = {
  body: z.object({
    title,
    done
  }),
  params: z.object({
    taskId
  })
};

export const deleteTaskSchema = {
  params: z.object({
    taskId
  })
};
