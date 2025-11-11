import CheckoutProgress from '@/components/CheckoutProgress';
import { Suspense } from 'react';

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-2xl mx-auto">
          <Suspense fallback={<div>Carregando progresso...</div>}>
            <CheckoutProgress />
          </Suspense>
        </div>

        <div className="mt-12">
          <Suspense fallback={<div>Carregando conteúdo...</div>}>
            {children}
          </Suspense>
        </div>
      </div>
    </div>
  );
}

