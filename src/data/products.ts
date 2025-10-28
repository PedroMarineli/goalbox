import { Product } from '@/models/Product';

export const products: Product[] = [
  {
    id: 1,
    name: 'Nike Phantom Luna',
    brand: 'Nike',
    price: 1599.99,
    image: '/images/phantom-luna.jpg',
    description: 'Feita para passes precisos e jogadas geniais.',
  },
  {
    id: 2,
    name: 'Adidas Predator Accuracy',
    brand: 'Adidas',
    price: 1499.99,
    image: '/images/predator-accuracy.jpg',
    description: 'Controle e precisão absolutos para o seu jogo.',
  },
  {
    id: 3,
    name: 'Puma Future Ultimate',
    brand: 'Puma',
    price: 1399.99,
    image: '/images/future-ultimate.jpg',
    description: 'Agilidade e criatividade para jogadas imprevisíveis.',
  },
  {
    id: 4,
    name: 'Nike Tiempo Legend 10',
    brand: 'Nike',
    price: 1299.99,
    image: '/images/tiempo-legend.jpg',
    description: 'Toque de bola lendário e conforto inigualável.',
  },
  {
    id: 5,
    name: 'Adidas Copa Pure',
    brand: 'Adidas',
    price: 1199.99,
    image: '/images/copa-pure.jpg',
    description: 'Conforto e toque clássicos para o jogador moderno.',
  },
  {
    id: 6,
    name: 'Puma King Ultimate',
    brand: 'Puma',
    price: 1099.99,
    image: '/images/king-ultimate.jpg',
    description: 'A realeza do futebol, agora mais leve e moderna.',
  },
];
