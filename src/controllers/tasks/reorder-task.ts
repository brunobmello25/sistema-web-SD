import { Task } from "@prisma/client";
import httpStatus from "http-status";
import { prisma } from "~/database";
import { ApplicationError } from "~/errors/application-error";

type Props = {
  taskId: number;
  beAfter: number;
  categoryId: number;
  username: string;
};

export class ReorderTaskController {
  async handle({ categoryId, username, beAfter, taskId }: Props): Promise<Task> {
    const user = await prisma.user.findFirst({
      where: {
        username
      }
    });

    if (!user) {
      throw new ApplicationError("User not found", httpStatus.BAD_REQUEST);
    }

    const category = await prisma.category.findFirst({
      where: {
        id: categoryId
      }
    });

    if (!category) {
      throw new ApplicationError("Category not found", httpStatus.BAD_REQUEST);
    }

    let task = await prisma.task.findFirst({
      where: {
        id: taskId
      }
    });

    if (!task) {
      throw new ApplicationError("Task not found", httpStatus.NOT_FOUND);
    }

    await prisma.task.updateMany({
      where: {
        position: {
          gt: beAfter
        },
        category: {
          id: categoryId
        }
      },
      data: {
        position: {
          increment: 1
        }
      }
    });

    task = await prisma.task.update({
      where: {
        id: taskId
      },
      data: {
        position: beAfter + 1,
        category: {
          connect: {
            id: categoryId
          }
        }
      }
    });

    return task;
  }
}
