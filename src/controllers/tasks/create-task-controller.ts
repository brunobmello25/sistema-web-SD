import { Task } from ".prisma/client";
import httpStatus from "http-status";
import { prisma } from "~/database";
import { ApplicationError } from "~/errors/application-error";

type Props = {
  username: string;
  title: string;
  categoryId: number;
};

export class CreateTaskController {
  async handle({ username, title, categoryId }: Props): Promise<Task> {
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

    const lastTask = await prisma.task.findFirst({
      orderBy: {
        position: "desc"
      },
      where: {
        category: {
          id: category.id
        }
      }
    });

    const task = await prisma.task.create({
      data: {
        title,
        position: lastTask ? lastTask.position + 1 : 1,
        category: {
          connect: {
            id: category.id
          }
        }
      }
    });

    return task;
  }
}
