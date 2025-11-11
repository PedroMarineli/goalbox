import Link from 'next/link';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const OrderSuccessPage = () => {
  return (
    <div className="container mx-auto my-12 flex items-center justify-center">
      <Card className="w-full max-w-lg text-center">
        <CardHeader>
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
            <CheckCircle className="h-8 w-8 text-green-500" />
          </div>
          <CardTitle className="mt-4 text-3xl font-bold">Pedido Realizado com Sucesso!</CardTitle>
          <CardDescription className="mt-2 text-lg text-muted-foreground">
            Obrigado pela sua compra. Você receberá uma confirmação por e-mail em breve.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center gap-4">
            <Button asChild>
              <Link href="/">Voltar para a Home</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/products">Continuar Comprando</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderSuccessPage;

