import { Router } from "express";
import { tasksRouter } from "./tasks-router";
import { categoriesRouter } from "./categories-router";

export const router = Router();

router.use("/tasks", tasksRouter);
router.use("/categories", categoriesRouter);
