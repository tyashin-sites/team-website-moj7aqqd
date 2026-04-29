import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { ProductDetails } from '@/components/products/ProductDetails';
import { getProduct, getProducts } from '@/lib/tyashin';

interface ProductPageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  try {
    const { products } = await getProducts({ limit: 100 });
    return products.map((product) => ({
      slug: product.slug,
    }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  try {
    const { product } = await getProduct(params.slug);
    return {
      title: product.name,
      description: product.description || product.shortDescription || product.name,
      openGraph: {
        title: product.name,
        description: product.description || product.shortDescription || product.name,
        images: product.images?.map(img => img.url) || [],
        type: 'product',
      },
      twitter: {
        card: 'summary_large_image',
        title: product.name,
        description: product.description || product.shortDescription || product.name,
        images: product.images?.[0]?.url ? [product.images[0].url] : [],
      },
    };
  } catch {
    return {
      title: 'Product Not Found',
      description: 'The requested product could not be found.',
    };
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  try {
    const { product } = await getProduct(params.slug);

    return (
      <div className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <div className="space-y-4">
              {product.images && product.images.length > 0 ? (
                <div className="aspect-square relative bg-gray-100 rounded-lg overflow-hidden">
                  <Image
                    src={product.images[0].url}
                    alt={product.images[0].alt || product.name}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              ) : (
                <div className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500">No image available</span>
                </div>
              )}
              
              {product.images && product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {product.images.slice(1, 5).map((image, index) => (
                    <div key={index} className="aspect-square relative bg-gray-100 rounded overflow-hidden">
                      <Image
                        src={image.url}
                        alt={image.alt || `${product.name} ${index + 2}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Product Details */}
            <ProductDetails product={product} />
          </div>
        </div>
      </div>
    );
  } catch {
    notFound();
  }
}