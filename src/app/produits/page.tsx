import Navbar from "@/components/Navbar";
import ProductsHero from "@/components/ProductsHero";
import ProductsSection from "@/components/ProductsSection";
import Footer from "@/components/Footer";
import { productsData } from "@/data/productsData";

export const dynamic = "force-dynamic";

type Product = {
  id: number | string;
  name: string;
  brand: string;
  category: string;
  weight?: string;
  packaging?: string;
  packing?: string;
  origin?: string;
  description?: string;
  image?: string;
  alt?: string;
  is_active?: boolean;
  created_at?: string;
};

async function getDjangoProducts(): Promise<Product[]> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";

  try {
    const response = await fetch(`${apiUrl}/products/`, {
      cache: "no-store",
    });

    if (!response.ok) {
      return [];
    }

    const products = await response.json();

    if (!Array.isArray(products)) {
      return [];
    }

    return products.map((product) => ({
      ...product,
      id: `db-${product.id}`,
      alt: product.alt || product.name,
      packaging: product.packaging || product.packing || "",
    }));
  } catch {
    return [];
  }
}

export default async function ProduitsPage() {
  const djangoProducts = await getDjangoProducts();

  const localProducts = productsData.map((product) => ({
    ...product,
    id: `local-${product.id}`,
    packaging: product.packing || "",
  }));

  const products = djangoProducts.length > 0 ? djangoProducts : localProducts;

  return (
    <>
      <Navbar />

      <main>
        <ProductsHero />
        <ProductsSection products={products} />
      </main>

      <Footer />
    </>
  );
}