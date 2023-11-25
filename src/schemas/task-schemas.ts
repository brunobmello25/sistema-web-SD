import { z } from "zod";

export const createTaskSchema = {
  body: z.object({
    title: z.string()
  }),
  query: z.object({
    username: z.string()
  })
};
