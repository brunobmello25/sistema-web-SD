import httpStatus from "http-status";
import { Router } from "express";
import { validateRequest } from "zod-express-middleware";

import { authenticationSchema } from "~/schemas/authentication-schemas";

import { ApplicationError } from "~/errors/application-error";
import { ListCategoriesController } from "~/controllers/categories/list-categories-controller";

export const categoriesRouter = Router();

categoriesRouter.get(
  "/",
  validateRequest({ query: authenticationSchema.query }),
  async (req, res) => {
    try {
      const categories = await new ListCategoriesController().handle({
        username: req.query.username
      });

      res.json(categories);
    } catch (err: unknown) {
      if (err instanceof ApplicationError) {
        return res.status(err.statusCode).json({ error: err.message });
      }

      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: "something went wrong" });
    }
  }
);
