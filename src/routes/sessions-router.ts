import httpStatus from "http-status";
import { Router } from "express";
import { validateRequest } from "zod-express-middleware";

import { ApplicationError } from "~/errors/application-error";
import { createSessionSchema } from "~/schemas/sessions-schemas";
import { CreateSessionController } from "~/controllers/sessions/create-session-controller";

export const sessionsRouter = Router();

sessionsRouter.post(
  "/",
  validateRequest({
    body: createSessionSchema.body
  }),
  async (req, res) => {
    try {
      const user = await new CreateSessionController().handle({
        username: req.body.username
      });

      res.json(user);
    } catch (err: unknown) {
      if (err instanceof ApplicationError) {
        return res.status(err.statusCode).json({ error: err.message });
      }

      console.error(err);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: "something went wrong" });
    }
  }
);
