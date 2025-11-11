'use client';

import { useCart } from '@/lib/CartContext';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';

const OrderSummary = () => {
  const { cartItems } = useCart();

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = 0; // Frete grátis
  const total = subtotal + shipping;

  return (
    <div className="w-full md:w-1/3 lg:w-2/5 bg-muted/50 p-8 rounded-lg">
      <h2 className="text-2xl font-semibold mb-6">Resumo do Pedido</h2>
      
      <div className="space-y-4">
        {cartItems.map(item => (
          <div key={item.id} className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16 rounded-md overflow-hidden border">
                <Image 
                  src={item.image} 
                  alt={item.name} 
                  fill 
                  sizes="64px"
                  className="object-cover" 
                />
                <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  {item.quantity}
                </span>
              </div>
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-muted-foreground">{item.brand}</p>
              </div>
            </div>
            <p className="font-medium">R$ {(item.price * item.quantity).toFixed(2)}</p>
          </div>
        ))}
      </div>

      <Separator className="my-6" />

      <div className="space-y-2">
        <div className="flex justify-between">
          <p className="text-muted-foreground">Subtotal</p>
          <p>R$ {subtotal.toFixed(2)}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-muted-foreground">Frete</p>
          <p>Grátis</p>
        </div>
      </div>

      <Separator className="my-6" />

      <div className="flex justify-between font-bold text-xl">
        <p>Total</p>
        <p>R$ {total.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default OrderSummary;
