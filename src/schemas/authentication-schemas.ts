import { z } from "zod";

export const authenticationSchema = {
  query: z.object({ username: z.string() })
};
