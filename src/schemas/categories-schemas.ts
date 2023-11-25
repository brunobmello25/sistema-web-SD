import { z } from "zod";

const name = z.string();
const categoryId = z.string().regex(/^\d+$/);

export const createCategorySchema = {
  body: z.object({
    name
  })
};

export const updateCategorySchema = {
  body: z.object({
    name
  }),
  params: z.object({
    categoryId
  })
};
