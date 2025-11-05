'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Check } from 'lucide-react';

const SubscriptionPage = () => {
  const router = useRouter();

  const handleSubscribe = () => {
    router.push('/checkout/information?type=subscription');
  };

  return (
    <div className="container py-12 flex justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl">Plano de Assinatura GoalBox</CardTitle>
          <CardDescription>Receba uma chuteira surpresa todo mês!</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center mb-8">
            <p className="text-5xl font-extrabold">R$199<span className="text-xl font-normal text-muted-foreground">/mês</span></p>
          </div>
          <ul className="space-y-3">
            <li className="flex items-center">
              <Check className="h-5 w-5 text-green-500 mr-2" />
              <span>Uma chuteira de alta qualidade</span>
            </li>
            <li className="flex items-center">
              <Check className="h-5 w-5 text-green-500 mr-2" />
              <span>Modelos selecionados por especialistas</span>
            </li>
            <li className="flex items-center">
              <Check className="h-5 w-5 text-green-500 mr-2" />
              <span>Frete grátis para todo o Brasil</span>
            </li>
            <li className="flex items-center">
              <Check className="h-5 w-5 text-green-500 mr-2" />
              <span>Cancele quando quiser</span>
            </li>
          </ul>
        </CardContent>
        <CardFooter>
          <Button
            onClick={handleSubscribe}
            size="lg"
            className="w-full"
          >
            Assinar Agora
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SubscriptionPage;
