import { Router } from "express";
import { validateRequestQuery, validateRequestBody } from "zod-express-middleware";
import { CreateTaskController } from "~/controllers/create-task-controller";

import { ListTasksController } from "~/controllers/list-tasks-controller";
import { authenticationSchema } from "~/schemas/authentication-schemas";
import { createTaskSchema } from "~/schemas/task-schemas";

export const tasksRouter = Router();

tasksRouter.get("/", validateRequestQuery(authenticationSchema.query), async (req, res) => {
  const tasks = await new ListTasksController().handle({ username: req.query.username });

  res.json(tasks);
});

tasksRouter.post(
  "/",
  validateRequestBody(createTaskSchema.body),
  validateRequestQuery(createTaskSchema.query),
  async (req, res) => {
    try {
      const tasks = await new CreateTaskController().handle({
        username: req.query.username,
        title: req.body.title
      });

      res.json(tasks);
    } catch (err) {
      res.status(400).json({ error: "something went wrong" });
    }
  }
);
