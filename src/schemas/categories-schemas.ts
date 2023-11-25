import { z } from "zod";

const name = z.string();

export const createCategorySchema = {
  body: z.object({
    name
  })
};
