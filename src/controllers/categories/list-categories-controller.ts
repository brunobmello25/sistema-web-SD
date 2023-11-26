import { Category } from "@prisma/client";
import httpStatus from "http-status";

import { prisma } from "~/database";
import { ApplicationError } from "~/errors/application-error";

type Props = {
  username: string;
};

export class ListCategoriesController {
  async handle({ username }: Props): Promise<Category[]> {
    const user = await prisma.user.findFirst({
      where: {
        username
      }
    });

    if (!user) {
      throw new ApplicationError("User not found", httpStatus.BAD_REQUEST);
    }

    const categories = await prisma.category.findMany({
      where: {
        user: {
          id: user.id
        }
      },
      orderBy: {
        position: "asc"
      },
      include: {
        tasks: {
          orderBy: [
            {
              done: "asc"
            },
            {
              position: "asc"
            }
          ]
        }
      }
    });

    return categories;
  }
}
