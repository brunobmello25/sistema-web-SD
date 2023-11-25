import { Task } from ".prisma/client";
import httpStatus from "http-status";
import { prisma } from "~/database";
import { ApplicationError } from "~/errors/application-error";

type Props = {
  username: string;
  title: string;
};

export class CreateTaskController {
  async handle({ username, title }: Props): Promise<Task> {
    const user = await prisma.user.findFirst({
      where: {
        username
      }
    });

    if (!user) {
      throw new ApplicationError("User not found", httpStatus.BAD_REQUEST);
    }

    const task = await prisma.task.create({
      data: {
        title,
        user: {
          connect: {
            id: user.id
          }
        }
      }
    });

    return task;
  }
}
