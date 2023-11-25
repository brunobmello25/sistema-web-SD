import { z } from "zod";

export const createSessionSchema = {
  body: z.object({
    username: z.string()
  })
};
