'use client';

import { useState, Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/lib/CartContext";

function CheckoutPaymentForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { clearCart } = useCart();
  const [loading, setLoading] = useState(false);

  if (!searchParams) {
    return <div>Carregando...</div>;
  }

  const checkoutType = searchParams.get('type');
  const isSubscription = checkoutType === 'subscription';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simula o processamento do pagamento
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    if (isSubscription) {
      // Para assinatura, não limpamos o carrinho, apenas redirecionamos
      router.push('/subscription/success');
    } else {
      clearCart();
      router.push('/order/success');
    }
    setLoading(false);
  };

  const backUrl = isSubscription ? '/checkout/information?type=subscription' : '/checkout/information';

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pagamento</CardTitle>
        <CardDescription>Insira os detalhes do seu cartão de crédito.</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="cardNumber">Número do Cartão</Label>
            <Input id="cardNumber" placeholder="0000 0000 0000 0000" required />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="cardName">Nome no Cartão</Label>
            <Input id="cardName" placeholder="Seu nome como aparece no cartão" required />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="expiryDate">Data de Validade</Label>
              <Input id="expiryDate" placeholder="MM/AA" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cvc">CVC</Label>
              <Input id="cvc" placeholder="123" required />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <Button variant="ghost" asChild>
            <Link href={backUrl}>Voltar</Link>
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? 'Processando...' : 'Pagar Agora'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}

const CheckoutPaymentPage = () => {
  return (
    <div className="container py-12 max-w-2xl">
      <Suspense fallback={<div>Carregando...</div>}>
        <CheckoutPaymentForm />
      </Suspense>
    </div>
  );
};

export default CheckoutPaymentPage;