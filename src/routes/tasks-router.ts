import { Router } from "express";
import { ListTasksController } from "~/controllers/list-tasks-controller";

export const tasksRouter = Router();

tasksRouter.get("/", async (req, res) => {
  const username = req.headers.username;

  if (!username || typeof username !== "string")
    return res.status(400).json({ error: "Username is required" });

  const tasks = await new ListTasksController().handle({ username });

  res.json(tasks);
});
