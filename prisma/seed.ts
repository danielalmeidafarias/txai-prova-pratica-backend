import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function seed() {
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
  console.log(master_user);
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
