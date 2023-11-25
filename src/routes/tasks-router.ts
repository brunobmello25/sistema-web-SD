import httpStatus from "http-status";
import { Router } from "express";
import { validateRequest } from "zod-express-middleware";

import { CreateTaskController } from "~/controllers/tasks/create-task-controller";
import { UpdateTaskController } from "~/controllers/tasks/update-task-controller";
import { DeleteTaskController } from "~/controllers/tasks/delete-task-controller";

import { authenticationSchema } from "~/schemas/authentication-schemas";
import {
  createTaskSchema,
  deleteTaskSchema,
  reorderTaskSchema,
  updateTaskSchema
} from "~/schemas/task-schemas";

import { ApplicationError } from "~/errors/application-error";
import { ReorderTaskController } from "~/controllers/tasks/reorder-task";

export const tasksRouter = Router();

tasksRouter.post(
  "/",
  validateRequest({
    body: createTaskSchema.body,
    query: authenticationSchema.query
  }),
  async (req, res) => {
    try {
      const task = await new CreateTaskController().handle({
        username: req.query.username,
        title: req.body.title,
        categoryId: Number(req.body.categoryId)
      });

      res.json(task);
    } catch (err: unknown) {
      if (err instanceof ApplicationError) {
        return res.status(err.statusCode).json({ error: err.message });
      }

      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: "something went wrong" });
    }
  }
);

tasksRouter.put(
  "/:taskId",
  validateRequest({
    body: updateTaskSchema.body,
    query: authenticationSchema.query,
    params: updateTaskSchema.params
  }),
  async (req, res) => {
    try {
      const task = await new UpdateTaskController().handle({
        taskId: Number(req.params.taskId),
        title: req.body.title,
        done: req.body.done
      });

      res.json(task);
    } catch (err: unknown) {
      if (err instanceof ApplicationError) {
        return res.status(err.statusCode).json({ error: err.message });
      }

      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: "something went wrong" });
    }
  }
);

tasksRouter.delete(
  "/:taskId",
  validateRequest({
    query: authenticationSchema.query,
    params: deleteTaskSchema.params
  }),
  async (req, res) => {
    try {
      await new DeleteTaskController().handle({
        taskId: Number(req.params.taskId),
        username: req.query.username
      });

      res.sendStatus(httpStatus.NO_CONTENT);
    } catch (err: unknown) {
      if (err instanceof ApplicationError) {
        return res.status(err.statusCode).json({ error: err.message });
      }

      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: "something went wrong" });
    }
  }
);

tasksRouter.put(
  "/:taskId/reorder",
  validateRequest({
    query: authenticationSchema.query,
    body: reorderTaskSchema.body,
    params: reorderTaskSchema.params
  }),
  async (req, res) => {
    try {
      const task = await new ReorderTaskController().handle({
        taskId: Number(req.params.taskId),
        username: req.query.username,
        categoryId: req.body.categoryId,
        beAfter: req.body.beAfter
      });

      res.status(httpStatus.OK).json(task);
    } catch (err: unknown) {
      if (err instanceof ApplicationError) {
        return res.status(err.statusCode).json({ error: err.message });
      }

      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: "something went wrong" });
    }
  }
);
