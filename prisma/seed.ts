import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function seed() {
  // Create master user
  const master_user = await prisma.user.create({
    data: {
      cpf: '00000000000',
      email: 'admin-master@email.com',
      fullname: 'admin-master',
      nickname: 'admin-master',
      password: await bcrypt.hash('123456789@', await bcrypt.genSalt()),
      role: Role.MASTER,
    },
  });

  // Create additional users
  const userPromises = [];
  for (let i = 1; i <= 10; i++) {
    userPromises.push(prisma.user.create({
      data: {
        cpf: `0000000000${i}`,
        email: `user${i}@email.com`,
        fullname: `User ${i}`,
        nickname: `user${i}`,
        password: await bcrypt.hash('123456789@', await bcrypt.genSalt()),
        role: Role.USER,
      },
    }));
  }
  const users = await Promise.all(userPromises);

  // Create products for the master user
  const masterProductPromises = [];
  for (let j = 1; j <= 3; j++) {
    masterProductPromises.push(prisma.product.create({
      data: {
        name: `Master Product ${j}`,
        description: `Description for Master Product ${j}`,
        quantity: 10 * j,
        price: 19.99 * j,
        owner_id: master_user.id,
        image_url: `http://example.com/master_product${j}.jpg`,
      },
    }));
  }
  await Promise.all(masterProductPromises);

  // Create products for each additional user
  for (const user of users) {
    const productPromises = [];
    for (let k = 1; k <= 3; k++) {
      productPromises.push(prisma.product.create({
        data: {
          name: `Product ${k}_user${user.nickname}`,
          description: `Description for Product ${k}_user${user.nickname}`,
          quantity: 10 * k,
          price: 19.99 * k,
          owner_id: user.id,
          image_url: `http://example.com/product${k}_user${user.nickname}.jpg`,
        },
      }));
    }
    await Promise.all(productPromises);
  }
}

seed()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
