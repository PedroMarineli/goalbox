import Link from 'next/link';
import { CheckCircle, Star } from 'lucide-react';

const SubscriptionSuccessPage = () => {
  return (
    <div className="container mx-auto my-12 flex flex-col items-center justify-center text-center">
      <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
      <h1 className="text-4xl font-bold mb-2">Assinatura Confirmada!</h1>
      <p className="text-lg text-gray-600 mb-8">
        Parabéns! Você agora é parte do nosso clube. Aproveite seus benefícios exclusivos.
      </p>
      <div className="flex gap-4">
        <Link href="/" className="bg-gray-800 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-900">
          Voltar para a Home
        </Link>
        <Link href="/products" className="border border-gray-800 text-gray-800 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100">
          Ver Produtos
        </Link>
      </div>
    </div>
  );
};

export default SubscriptionSuccessPage;
