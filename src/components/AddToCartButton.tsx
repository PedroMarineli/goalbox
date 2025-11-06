'use client';

import { useState } from 'react';
import { useCart } from '@/lib/CartContext';
import { Product } from '@/models/Product';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';


interface AddToCartButtonProps {
  product: Product;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast.success(`${quantity} ${product.name}(s) foram adicionados ao carrinho!`);
  };

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <Label htmlFor="quantity" className="sr-only">Quantidade</Label>
        <Input
          type="number"
          id="quantity"
          name="quantity"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value, 10) || 1)}
          className="w-20 text-center"
        />
      </div>
      <Button onClick={handleAddToCart} className="flex-grow">
        Adicionar ao Carrinho
      </Button>
    </div>
  );
};

export default AddToCartButton;
