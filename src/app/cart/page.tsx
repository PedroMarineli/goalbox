'use client';

import { useCart } from '@/lib/CartContext';
import Image from 'next/image';
import Link from 'next/link';

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Seu Carrinho</h1>
      {cartItems.length === 0 ? (
        <p>Seu carrinho está vazio. <Link href="/products" className="text-blue-500">Continue comprando</Link></p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center justify-between border-b py-4">
              <div className="flex items-center">
                <div className="relative w-24 h-24 mr-4">
                  <Image
                    src={item.image}
                    alt={item.name}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-md"
                  />
                </div>
                <div>
                  <h2 className="text-lg font-bold">{item.name}</h2>
                  <p className="text-gray-500">R$ {item.price.toFixed(2)}</p>
                </div>
              </div>
              <div className="flex items-center">
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                  className="w-16 border rounded-lg p-2 text-center mx-4"
                />
                <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700">
                  Remover
                </button>
              </div>
            </div>
          ))}
          <div className="mt-8 flex justify-between items-center">
            <h2 className="text-2xl font-bold">Total: R$ {total.toFixed(2)}</h2>
            <button onClick={clearCart} className="bg-gray-300 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-400">
              Limpar Carrinho
            </button>
          </div>
          <div className="mt-8 text-right">
            <button className="bg-green-500 text-white px-8 py-3 rounded-lg font-bold hover:bg-green-600">
              Finalizar Compra
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
