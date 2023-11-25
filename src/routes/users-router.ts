import httpStatus from "http-status";
import { Router } from "express";
import { validateRequest } from "zod-express-middleware";

import { ApplicationError } from "~/errors/application-error";
import { authenticationSchema } from "~/schemas/authentication-schemas";
import { DeleteUserController } from "~/controllers/users/delete-user-controller";

export const usersRouter = Router();

usersRouter.delete(
  "/",
  validateRequest({
    query: authenticationSchema.query
  }),
  async (req, res) => {
    try {
      await new DeleteUserController().handle({
        username: req.query.username
      });

      res.sendStatus(httpStatus.NO_CONTENT);
    } catch (err: unknown) {
      if (err instanceof ApplicationError) {
        return res.status(err.statusCode).json({ error: err.message });
      }

      console.error(err);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: "something went wrong" });
    }
  }
);
