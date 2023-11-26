import httpStatus from "http-status";
import { Category } from "@prisma/client";

import { prisma } from "~/database";
import { ApplicationError } from "~/errors/application-error";

type Props = {
  categoryId: number;
  beAfter: number;
  username: string;
};

export class ReorderCategoryController {
  async handle({ categoryId, username, beAfter }: Props): Promise<Category> {
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

    await prisma.category.updateMany({
      where: {
        position: {
          gt: beAfter
        },
        user: {
          id: user.id
        }
      },
      data: {
        position: {
          increment: 1
        }
      }
    });

    category = await prisma.category.update({
      where: {
        id: categoryId
      },
      data: {
        position: beAfter + 1,
        user: {
          connect: {
            id: user.id
          }
        }
      }
    });

    return category;
  }
}
