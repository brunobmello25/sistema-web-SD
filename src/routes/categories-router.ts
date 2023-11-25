import httpStatus from "http-status";
import { Router } from "express";
import { validateRequest } from "zod-express-middleware";

import { authenticationSchema } from "~/schemas/authentication-schemas";

import { ApplicationError } from "~/errors/application-error";
import { ListCategoriesController } from "~/controllers/categories/list-categories-controller";
import {
  createCategorySchema,
  deleteCategorySchema,
  updateCategorySchema
} from "~/schemas/categories-schemas";
import { CreateCategoryController } from "~/controllers/categories/create-category-controller";
import { UpdateCategoryController } from "~/controllers/categories/update-category-controller";
import { DeleteCategoryController } from "~/controllers/categories/delete-category-controller";

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

categoriesRouter.post(
  "/",
  validateRequest({
    body: createCategorySchema.body,
    query: authenticationSchema.query
  }),
  async (req, res) => {
    try {
      const category = await new CreateCategoryController().handle({
        username: req.query.username,
        name: req.body.name
      });

      res.json(category);
    } catch (err: unknown) {
      if (err instanceof ApplicationError) {
        return res.status(err.statusCode).json({ error: err.message });
      }

      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: "something went wrong" });
    }
  }
);

categoriesRouter.put(
  "/:categoryId",
  validateRequest({
    body: updateCategorySchema.body,
    query: authenticationSchema.query,
    params: updateCategorySchema.params
  }),
  async (req, res) => {
    try {
      const category = await new UpdateCategoryController().handle({
        username: req.query.username,
        name: req.body.name,
        categoryId: Number(req.params.categoryId)
      });

      res.json(category);
    } catch (err: unknown) {
      if (err instanceof ApplicationError) {
        return res.status(err.statusCode).json({ error: err.message });
      }

      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: "something went wrong" });
    }
  }
);

categoriesRouter.delete(
  "/:categoryId",
  validateRequest({
    query: authenticationSchema.query,
    params: deleteCategorySchema.params
  }),
  async (req, res) => {
    try {
      await new DeleteCategoryController().handle({
        categoryId: Number(req.params.categoryId),
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
