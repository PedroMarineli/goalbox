'use client';

import { useState } from 'react';
import { products } from '@/data/products';
import Image from 'next/image';
import { useCart } from '@/lib/CartContext';

const ProductDetailPage = ({ params }: { params: { id: string } }) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const product = products.find((p) => p.id === parseInt(params.id));

  if (!product) {
    return <div>Produto não encontrado</div>;
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    alert(`${quantity} ${product.name}(s) foram adicionados ao carrinho!`);
  };

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="relative w-full h-96">
        <Image
          src={product.image}
          alt={product.name}
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
      </div>
      <div>
        <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
        <p className="text-gray-500 text-lg mb-4">{product.brand}</p>
        <p className="text-3xl font-semibold mb-6">R$ {product.price.toFixed(2)}</p>
        <p className="text-gray-700 mb-6">{product.description}</p>
        <div className="flex items-center mb-6">
          <label htmlFor="quantity" className="mr-4 font-bold">Quantidade:</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            className="w-20 border rounded-lg p-2 text-center"
          />
        </div>
        <button
          onClick={handleAddToCart}
          className="w-full bg-blue-500 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-600"
        >
          Adicionar ao Carrinho
        </button>
      </div>
    </div>
  );
};

export default ProductDetailPage;
