import { Category } from ".prisma/client";
import httpStatus from "http-status";
import { prisma } from "~/database";
import { ApplicationError } from "~/errors/application-error";

type Props = {
  username: string;
  name: string;
};

export class CreateCategoryController {
  async handle({ username, name }: Props): Promise<Category> {
    const user = await prisma.user.findFirst({
      where: {
        username
      }
    });

    if (!user) {
      throw new ApplicationError("User not found", httpStatus.BAD_REQUEST);
    }

    const lastCategory = await prisma.category.findFirst({
      orderBy: {
        position: "desc"
      },
      where: {
        user: {
          id: user.id
        }
      }
    });

    const category = await prisma.category.create({
      data: {
        name,
        position: lastCategory ? lastCategory.position + 1 : 1,
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
