'use client';

import { useState } from 'react';
import getStripe from '@/lib/stripe';

const SubscriptionPage = () => {
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {
    setLoading(true);
    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ priceId: 'price_1Pz4iTRs8d3gX5g5j5g5j5g5' }), // Substitua pelo ID do seu preço
    });

    const { sessionId, error: apiError } = await response.json();

    if (apiError) {
      console.error(apiError);
      setLoading(false);
      return;
    }

    const stripe = await getStripe();
    if (!stripe) {
      setLoading(false);
      return;
    }

    const { error } = await stripe.redirectToCheckout({ sessionId });

    if (error) {
      console.error(error.message);
    }
    setLoading(false);
  };

  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-4">Plano de Assinatura GoalBox</h1>
      <p className="text-xl mb-8">Receba uma chuteira surpresa todo mês!</p>
      <div className="border rounded-lg p-8 max-w-sm mx-auto">
        <h2 className="text-2xl font-bold mb-4">Plano Mensal</h2>
        <p className="text-5xl font-bold mb-4">R$199<span className="text-lg">/mês</span></p>
        <ul className="text-left mb-8">
          <li className="mb-2">✔️ Uma chuteira de alta qualidade</li>
          <li className="mb-2">✔️ Modelos selecionados por especialistas</li>
          <li className="mb-2">✔️ Frete grátis para todo o Brasil</li>
          <li>✔️ Cancele quando quiser</li>
        </ul>
        <button
          onClick={handleSubscribe}
          disabled={loading}
          className="w-full bg-green-500 text-white py-3 rounded-lg font-bold hover:bg-green-600 disabled:bg-gray-400"
        >
          {loading ? 'Carregando...' : 'Assinar Agora'}
        </button>
      </div>
    </div>
  );
};

export default SubscriptionPage;
