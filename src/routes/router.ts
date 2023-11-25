import { Router } from "express";

import { tasksRouter } from "./tasks-router";
import { categoriesRouter } from "./categories-router";
import { sessionsRouter } from "./sessions-router";
import { usersRouter } from "./users-router";

export const router = Router();

router.use("/tasks", tasksRouter);
router.use("/categories", categoriesRouter);
router.use("/sessions", sessionsRouter);
router.use("/users", usersRouter);
