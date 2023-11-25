import { Router } from "express";
import { tasksRouter } from "./tasks-router";

export const router = Router();

router.use("/tasks", tasksRouter);
