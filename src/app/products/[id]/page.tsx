import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import AddToCartButton from '@/components/AddToCartButton';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const ProductDetailPage = async ({ params }: { params: { id: string } }) => {
  const product = await prisma.product.findUnique({
    where: { id: params.id },
  });

  if (!product) {
    notFound();
  }

  return (
    <div className="container mx-auto my-12">
      <div className="grid md:grid-cols-2 gap-12 items-start">
        <Card className="overflow-hidden">
          <div className="relative w-full aspect-square">
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
            />
          </div>
        </Card>
        
        <div className="flex flex-col h-full">
          <Card>
            <CardHeader>
              <p className="text-sm text-muted-foreground">{product.brand}</p>
              <CardTitle className="text-4xl font-bold">{product.name}</CardTitle>
              <p className="text-3xl font-semibold pt-2">R$ {product.price.toFixed(2)}</p>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base leading-relaxed">{product.description}</CardDescription>
            </CardContent>
            <CardFooter>
              <AddToCartButton product={product} />
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
