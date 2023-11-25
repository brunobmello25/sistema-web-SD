import { Task } from ".prisma/client";
import { prisma } from "~/database";

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
      throw new Error("User not found");
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
