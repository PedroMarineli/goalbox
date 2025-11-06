const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const productsData = [
  {
    name: 'Marineli Phantom Luna',
    brand: 'Marineli',
    price: 1599.99,
    image: '/images/marineliraio.png',
    description: 'Feita para passes precisos e jogadas geniais.',
  },
  {
    name: 'Biro Predator Accuracy',
    brand: 'Biro',
    price: 1499.99,
    image: '/images/birofada.png',
    description: 'Controle e precisão absolutos para o seu jogo.',
  },
  {
    name: 'Naipe Future Ultimate',
    brand: 'Naipe',
    price: 1399.99,
    image: '/images/naiperaio.png',
    description: 'Agilidade e criatividade para jogadas imprevisíveis.',
  },
  {
    name: 'Endradié Tiempo Legend 10',
    brand: 'Endradié',
    price: 1299.99,
    image: '/images/endradiefogo.png',
    description: 'Toque de bola lendário e conforto inigualável.',
  },
  {
    name: 'Sonccini Copa Pure',
    brand: 'Sonccini',
    price: 1199.99,
    image: '/images/soncininatu.png',
    description: 'Conforto e toque clássicos para o jogador moderno.',
  },
  {
    name: 'Marble King Ultimate',
    brand: 'Marble',
    price: 1099.99,
    image: '/images/marblewind.png',
    description: 'A realeza do futebol, agora mais leve e moderna.',
  },
];

async function main() {
  console.log(`Start seeding ...`);
  for (const p of productsData) {
    const product = await prisma.product.create({
      data: p,
    });
    console.log(`Created product with id: ${product.id}`);
  }
  console.log(`Seeding finished.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
