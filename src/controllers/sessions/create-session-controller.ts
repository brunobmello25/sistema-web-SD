import { User } from "@prisma/client";
import { prisma } from "~/database";

type Props = {
  username: string;
};

export class CreateSessionController {
  async handle({ username }: Props): Promise<User> {
    const existingUser = await prisma.user.findFirst({
      where: {
        username
      }
    });

    if (existingUser) {
      return existingUser;
    }

    const user = await prisma.user.create({
      data: {
        username
      }
    });

    return user;
  }
}
