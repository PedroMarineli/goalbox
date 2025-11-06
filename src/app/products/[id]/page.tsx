import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import AddToCartButton from '@/components/AddToCartButton';

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
        <div className="relative w-full h-[500px] rounded-lg overflow-hidden shadow-lg">
          <Image
            src={product.image}
            alt={product.name}
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="flex flex-col justify-center h-full">
          <h1 className="text-4xl font-bold mb-2">{product.name}</h1>
          <p className="text-gray-500 text-lg mb-4">{product.brand}</p>
          <p className="text-3xl font-semibold mb-6">R$ {product.price.toFixed(2)}</p>
          <p className="text-gray-700 mb-8 leading-relaxed">{product.description}</p>
          
          <AddToCartButton product={product} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
