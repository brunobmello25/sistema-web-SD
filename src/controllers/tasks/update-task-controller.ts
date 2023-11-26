import { Task } from "@prisma/client";
import httpStatus from "http-status";
import { prisma } from "~/database";
import { ApplicationError } from "~/errors/application-error";

type Props = {
  taskId: number;
  title: string;
  done: boolean;
};

export class UpdateTaskController {
  async handle({ taskId, title, done }: Props): Promise<Task> {
    const task = await prisma.task.findFirst({
      where: {
        id: taskId
      }
    });

    if (!task) {
      throw new ApplicationError("Task not found", httpStatus.NOT_FOUND);
    }

    console.log("updating done: ", done);
    const updatedTask = await prisma.task.update({
      where: {
        id: taskId
      },
      data: {
        title,
        done
      }
    });

    return updatedTask;
  }
}
