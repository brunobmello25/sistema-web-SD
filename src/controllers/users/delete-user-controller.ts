import httpStatus from "http-status";
import { prisma } from "~/database";
import { ApplicationError } from "~/errors/application-error";

type Props = {
  username: string;
};

export class DeleteUserController {
  async handle({ username }: Props): Promise<void> {
    const user = await prisma.user.findUnique({
      where: {
        username
      }
    });

    if (!user) {
      throw new ApplicationError("User not found", httpStatus.NOT_FOUND);
    }

    await prisma.user.delete({
      where: {
        id: user.id
      },
      include: {
        categories: {
          include: {
            tasks: true
          }
        }
      }
    });
  }
}
