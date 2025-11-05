'use client';

import { Suspense } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

function CheckoutInformationForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Explicit null check to satisfy TypeScript
  if (!searchParams) {
    return <div>Carregando...</div>;
  }

  const checkoutType = searchParams.get('type');
  const isSubscription = checkoutType === 'subscription';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nextUrl = isSubscription ? '/checkout/payment?type=subscription' : '/checkout/payment';
    router.push(nextUrl);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Informações de Contato</CardTitle>
        <CardDescription>
          {isSubscription 
            ? "Precisamos do seu e-mail para gerenciar sua assinatura."
            : "Para onde devemos enviar seu pedido?"
          }
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="seu@email.com" required />
          </div>
          
          {!isSubscription && (
            <>
              <h3 className="text-lg font-semibold pt-4 border-t">Endereço de Entrega</h3>
              
              <div className="space-y-2">
                <Label htmlFor="name">Nome Completo</Label>
                <Input id="name" placeholder="Seu nome completo" required />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="address">Endereço</Label>
                  <Input id="address" placeholder="Rua, número e complemento" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="apt">Bairro</Label>
                  <Input id="apt" placeholder="Seu bairro" required />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">Cidade</Label>
                  <Input id="city" placeholder="Sua cidade" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">Estado</Label>
                  <Input id="state" placeholder="UF" required maxLength={2} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zip">CEP</Label>
                  <Input id="zip" placeholder="00000-000" required />
                </div>
              </div>
            </>
          )}
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <Button variant="ghost" asChild>
            <Link href={isSubscription ? "/subscription" : "/cart"}>
              {isSubscription ? "Voltar" : "Voltar ao carrinho"}
            </Link>
          </Button>
          <Button type="submit">Ir para Pagamento</Button>
        </CardFooter>
      </form>
    </Card>
  );
}

const CheckoutInformationPage = () => {
  return (
    <div className="container py-12 max-w-2xl">
      <Suspense fallback={<div>Carregando...</div>}>
        <CheckoutInformationForm />
      </Suspense>
    </div>
  );
};

export default CheckoutInformationPage;