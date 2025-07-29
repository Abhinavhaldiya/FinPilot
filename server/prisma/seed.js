
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const emp = await prisma.employee.create({
    data: {
      name: 'Alice Johnson',
      email: 'alice@example.com',
      contact: '1234567890',
      password: 'hashed_password',
    },
  });

  await prisma.leaveRequest.create({
    data: {
      employeeId: emp.id,
      startDate: new Date(),
      endDate: new Date(Date.now() + 5 * 86400000), // 5 days later
      type: 'vacation',
      reason: 'Family trip',
    },
  });

  console.log('Seeding complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
