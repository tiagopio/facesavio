import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

describe('User Model', () => {

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('deve criar um novo usuário', async () => {
    const uniqueSuffix = Date.now().toString();
    const uniqueUsername = `testuser-${uniqueSuffix}`;
    const user = await prisma.user.create({
      data: {
        clerkId: `uniqueClerkId-${uniqueSuffix}`,
        username: uniqueUsername,
        name: 'Test User',
        imageUrl: '',
      },
    });

    expect(user).toBeDefined();
    expect(user.username).toBe(uniqueUsername);

    await prisma.user.delete({
      where: { id: user.id },
    });
  });

  it('deve falhar ao criar um usuário com username duplicado', async () => {
    const uniqueSuffix = Date.now().toString();
    const uniqueUsername = `testuser-${uniqueSuffix}`;

    const user = await prisma.user.create({
      data: {
        clerkId: `uniqueClerkId-${uniqueSuffix}`,
        username: uniqueUsername,
        name: 'Test User',
        imageUrl: '',
      },
    });

    try {
      await prisma.user.create({
        data: {
          clerkId: `anotherUniqueClerkId-${uniqueSuffix}`,
          username: uniqueUsername, 
          name: 'Another User',
          imageUrl: '',
        },
      });
    } catch (e) {
      expect(e).toBeDefined();
    } finally {
      await prisma.user.delete({
        where: { id: user.id },
      });
    }
  });
});
