import { z } from "zod";

const taskId = z.string().regex(/^\d+$/);
const title = z.string();
const done = z.boolean();
const categoryId = z.number();

export const createTaskSchema = {
  body: z.object({
    title,
    categoryId
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

export const reorderTaskSchema = {
  body: z.object({
    categoryId,
    beAfter: z.number()
  }),
  params: z.object({
    taskId
  })
};
