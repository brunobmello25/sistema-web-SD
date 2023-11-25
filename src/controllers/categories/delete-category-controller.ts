import httpStatus from "http-status";
import { prisma } from "~/database";
import { ApplicationError } from "~/errors/application-error";

type Props = {
  categoryId: number;
  username: string;
};

export class DeleteCategoryController {
  async handle({ categoryId, username }: Props): Promise<void> {
    const category = await prisma.category.findUnique({
      where: {
        id: categoryId
      },
      include: {
        user: true
      }
    });

    if (!category) {
      throw new ApplicationError("Category not found", httpStatus.NOT_FOUND);
    }

    if (category.user.username !== username) {
      throw new ApplicationError("You can only delete your own categories", httpStatus.FORBIDDEN);
    }

    await prisma.category.delete({
      where: {
        id: categoryId
      },
      include: {
        tasks: true
      }
    });
  }
}
