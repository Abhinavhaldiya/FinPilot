import prisma from './prisma';
const bcrypt = require('bcrypt');

async function main() {
    const hashedPassword = await bcrypt.hash('12345678', 10);

    const user = await prisma.user.create({
        data: {
            name: 'Harshvardhan',
            email: 'harsh@gmail.com',
            password: hashedPassword,
        },
    });

    console.log('Seeded user:', user);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
