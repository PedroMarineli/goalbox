'use client';

import { Product } from '@/models/Product';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/lib/CartContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product, 1);
    alert(`${product.name} foi adicionado ao carrinho!`);
  };

  return (
    <div className="border rounded-lg p-4 flex flex-col">
      <Link href={`/products/${product.id}`}>
        <div className="relative w-full h-48 mb-4">
          <Image
            src={product.image}
            alt={product.name}
            layout="fill"
            objectFit="cover"
            className="rounded-md"
          />
        </div>
        <h2 className="text-lg font-bold">{product.name}</h2>
        <p className="text-gray-500">{product.brand}</p>
        <p className="text-xl font-semibold mt-2">R$ {product.price.toFixed(2)}</p>
      </Link>
      <button
        onClick={handleAddToCart}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
      >
        Adicionar ao Carrinho
      </button>
    </div>
  );
};

export default ProductCard;
