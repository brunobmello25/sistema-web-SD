import httpStatus from "http-status";
import { prisma } from "~/database";
import { ApplicationError } from "~/errors/application-error";

type Props = {
  taskId: number;
  username: string;
};

export class DeleteTaskController {
  async handle({ taskId, username }: Props): Promise<void> {
    const task = await prisma.task.findUnique({
      where: {
        id: taskId
      },
      include: {
        category: {
          include: {
            user: true
          }
        }
      }
    });

    if (!task) {
      throw new ApplicationError("Task not found", httpStatus.NOT_FOUND);
    }

    if (task.category?.user.username !== username) {
      throw new ApplicationError("You can only delete your own tasks", httpStatus.FORBIDDEN);
    }

    await prisma.task.delete({
      where: {
        id: taskId
      }
    });
  }
}
