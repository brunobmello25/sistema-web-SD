import { prisma } from "~/database";

type Props = {
  taskId: number;
};

export class DeleteTaskController {
  async handle({ taskId }: Props): Promise<void> {
    await prisma.task.delete({
      where: {
        id: taskId
      }
    });
  }
}
