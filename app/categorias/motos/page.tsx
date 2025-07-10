// app/paginxxa/page.tsx
import { getProducts } from "@/app/helpers/getProducts";
import HeroBanner from "@/components/hero/page";
import { ProductGrid } from "@/components/product-grid";
import { Suspense } from "react";
import { Product } from '@/lib/products/schema';
import Motos from "@/components/hero/motos";
import ProductSkeletonGrid from "@/components/ProductSkeletonGrid";


async function ProductsSection() {
  const rawProducts = await getProducts();
  const products: Product[] = rawProducts.map((product: any) => ({
  ...product,
  tags: Array.isArray(product.tags) ? product.tags.join(', ') : product.tags,
  status: Boolean(product.status), // ✅ Conversión explícita
}))
.filter((product: Product) => product.category?.toLowerCase() === "motos")
    .slice(0, 20); // ← solo los primeros 20 productos

  return <ProductGrid products={products} />;
}

export default async function PaginaPage() {

  return (
    <>
      <Motos/>
      <div className="w-full bg-gray-200 min-h-screen">
      <div className="w-full max-w-[1200px] mx-auto flex flex-col gap-4 p-4 md:p-8">
      <Suspense fallback={<ProductSkeletonGrid />}>
        <ProductsSection />
      </Suspense>
        </div>
        </div>
    </>
  );
}
