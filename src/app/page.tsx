import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
      <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
        <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
          GoalBox: Seu Clube de Assinatura de Chuteiras
        </h1>
        <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
          Receba em casa, todo mês, uma chuteira de alta performance selecionada por especialistas. Eleve seu jogo a um novo patamar.
        </p>
        <div className="space-x-4">
          <Button asChild>
            <Link href="/subscription">Quero Assinar</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/products">Ver Chuteiras</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
