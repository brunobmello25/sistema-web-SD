import { Category } from ".prisma/client";
import httpStatus from "http-status";
import { prisma } from "~/database";
import { ApplicationError } from "~/errors/application-error";

type Props = {
  username: string;
  categoryId: number;
  name: string;
};

export class UpdateCategoryController {
  async handle({ username, name, categoryId }: Props): Promise<Category> {
    const user = await prisma.user.findFirst({
      where: {
        username
      }
    });

    if (!user) {
      throw new ApplicationError("User not found", httpStatus.BAD_REQUEST);
    }

    let category = await prisma.category.findFirst({
      where: {
        id: categoryId
      }
    });

    if (!category) {
      throw new ApplicationError("Category not found", httpStatus.NOT_FOUND);
    }

    category = await prisma.category.update({
      where: { id: categoryId },
      data: {
        name
      }
    });

    return category;
  }
}
