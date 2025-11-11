import ProductCard from '@/components/ProductCard';
import { prisma } from '@/lib/prisma';

const ProductsPage = async () => {
  const products = await prisma.product.findMany();

  return (
    <section className="py-12">
      <div className="container">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Nossa Coleção de Chuteiras</h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Qualidade e performance para todos os tipos de jogador.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsPage;
