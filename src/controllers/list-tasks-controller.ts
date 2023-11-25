import { Task } from ".prisma/client";
import { prisma } from "~/database";

type Props = {
  username: string;
};

export class ListTasksController {
  async handle({ username }: Props): Promise<Task[]> {
    const tasks = await prisma.task.findMany({
      where: {
        user: {
          username
        }
      }
    });

    return tasks;
  }
}
