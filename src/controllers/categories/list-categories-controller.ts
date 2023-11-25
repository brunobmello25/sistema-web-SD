import { Category } from "@prisma/client";
import { prisma } from "~/database";

type Props = {
  username: string;
};

export class ListCategoriesController {
  async handle({ username }: Props): Promise<Category[]> {
    const categories = await prisma.category.findMany({
      where: {
        user: {
          username
        }
      },
      include: {
        tasks: true
      }
    });

    return categories;
  }
}
