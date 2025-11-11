'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

const steps = [
  { id: '01', name: 'Carrinho', href: '/cart' },
  { id: '02', name: 'Informações', href: '/checkout/information' },
  { id: '03', name: 'Pagamento', href: '/checkout/payment' },
];

const CheckoutProgress = () => {
  const pathname = usePathname();

  const getCurrentStepIndex = () => {
    if (!pathname) return -1;
    if (pathname.startsWith('/checkout/payment')) return 2;
    if (pathname.startsWith('/checkout/information')) return 1;
    if (pathname.startsWith('/cart')) return 0;
    return -1; // Not in a checkout step
  };

  const currentStepIndex = getCurrentStepIndex();

  if (currentStepIndex === -1) return null;

  return (
    <nav aria-label="Progress">
      <ol role="list" className="flex items-center">
        {steps.map((step, stepIdx) => {
          const isCompleted = stepIdx < currentStepIndex;
          const isCurrent = stepIdx === currentStepIndex;

          return (
            <li key={step.name} className="relative flex-1 last:flex-none">
              {/* Connector line */}
              {stepIdx > 0 && (
                <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full" aria-hidden="true">
                  <div className={`h-0.5 w-full ${isCompleted || isCurrent ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-700'}`} />
                </div>
              )}

              <div className="relative">
                {isCompleted ? (
                  <Link href={step.href} className="flex h-8 w-8 items-center justify-center rounded-full bg-primary hover:bg-primary/90">
                    <span className="text-sm font-medium text-primary-foreground">{step.id}</span>
                  </Link>
                ) : isCurrent ? (
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-primary bg-background" aria-current="step">
                    <span className="text-sm font-medium text-primary">{step.id}</span>
                  </div>
                ) : (
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-300 bg-background group-hover:border-gray-400 dark:border-gray-600">
                    <span className="text-sm font-medium text-gray-500 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-gray-100">{step.id}</span>
                  </div>
                )}
              </div>
              <p className={`mt-2 text-sm font-medium ${isCurrent ? 'text-primary' : 'text-muted-foreground'}`}>{step.name}</p>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default CheckoutProgress;
