"use client";

import { useState, Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/lib/CartContext";
import Image from "next/image";

function CheckoutPaymentForm() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const { clearCart } = useCart();
	const [loading, setLoading] = useState(false);
	const [paymentMethod, setPaymentMethod] = useState("card");

	if (!searchParams) {
		return <div>Carregando...</div>;
	}

	const checkoutType = searchParams.get("type");
	const isSubscription = checkoutType === "subscription";

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		// Simula o processamento do pagamento
		await new Promise((resolve) => setTimeout(resolve, 2000));

		if (isSubscription) {
			router.push("/subscription/success");
		} else {
			clearCart();
			router.push("/order/success");
		}
		setLoading(false);
	};

	const backUrl = isSubscription
		? "/checkout/information?type=subscription"
		: "/checkout/information";

	return (
		<Card>
			<CardHeader>
				<CardTitle>Pagamento</CardTitle>
				<CardDescription>
					Escolha sua forma de pagamento preferida.
				</CardDescription>
			</CardHeader>
			<form onSubmit={handleSubmit}>
				<CardContent className="space-y-6">
					<Tabs
						value={paymentMethod}
						onValueChange={setPaymentMethod}
						className="w-full"
					>
						<TabsList className="grid w-full grid-cols-2">
							<TabsTrigger value="card">Cartão de Crédito</TabsTrigger>
							<TabsTrigger value="pix">Pix</TabsTrigger>
						</TabsList>
						<TabsContent value="card" className="mt-6">
							<div className="space-y-4">
								<div className="space-y-2">
									<Label htmlFor="cardNumber">Número do Cartão</Label>
									<Input
										id="cardNumber"
										placeholder="0000 0000 0000 0000"
										required={paymentMethod === "card"}
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="cardName">Nome no Cartão</Label>
									<Input
										id="cardName"
										placeholder="Seu nome como aparece no cartão"
										required={paymentMethod === "card"}
									/>
								</div>
								<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
									<div className="space-y-2 md:col-span-2">
										<Label htmlFor="expiryDate">Data de Validade</Label>
										<Input
											id="expiryDate"
											placeholder="MM/AA"
											required={paymentMethod === "card"}
										/>
									</div>
									<div className="space-y-2">
										<Label htmlFor="cvc">CVC</Label>
										<Input
											id="cvc"
											placeholder="123"
											required={paymentMethod === "card"}
										/>
									</div>
								</div>
							</div>
						</TabsContent>
						<TabsContent value="pix" className="mt-6">
							<div className="flex flex-col items-center justify-center text-center">
								<p className="mb-4">
									Para pagar com Pix, escaneie o QR Code abaixo com o app do
									seu banco:
								</p>
								<div className="relative w-48 h-48 bg-gray-200 rounded-lg flex items-center justify-center">
									<Image
										src="/images/qr-code-placeholder.svg"
										alt="QR Code Pix"
										width={180}
										height={180}
									/>
								</div>
								<p className="mt-4 text-sm text-gray-600">
									O pedido será confirmado após a aprovação do pagamento.
								</p>
							</div>
						</TabsContent>
					</Tabs>
				</CardContent>
				<CardFooter className="flex justify-between items-center">
					<Button variant="ghost" asChild>
						<Link href={backUrl}>Voltar</Link>
					</Button>
					<Button type="submit" disabled={loading}>
						{loading
							? "Processando..."
							: paymentMethod === "pix"
							? "Finalizar Pedido"
							: "Pagar Agora"}
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