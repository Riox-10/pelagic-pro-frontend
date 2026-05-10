"use client";

import { useMemo, useState } from "react";
import ProductCard from "@/components/ProductCard";

type Product = {
  id: number | string;
  name: string;
  brand: string;
  category: string;
  weight?: string;
  packaging?: string;
  description?: string;
  image?: string;
  alt?: string;
  is_active?: boolean;
  created_at?: string;
};

type ProductsSectionProps = {
  products: Product[];
};

const brandFilters = ["Tous", "PALMA", "Lyra"];
const categoryFilters = ["Tous", "Sardines", "Maquereaux", "Bonites"];

export default function ProductsSection({ products }: ProductsSectionProps) {
  const [activeBrand, setActiveBrand] = useState("Tous");
  const [activeCategory, setActiveCategory] = useState("Tous");

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const brandMatch = activeBrand === "Tous" || product.brand === activeBrand;
      const categoryMatch =
        activeCategory === "Tous" || product.category === activeCategory;

      return brandMatch && categoryMatch;
    });
  }, [products, activeBrand, activeCategory]);

  return (
    <section className="bg-slate-50 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-sky-600">
            Produits de la mer
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Catalogue PALMA & Lyra
          </h2>

          <p className="mt-5 text-base leading-8 text-slate-600">
            Une gamme de sardines, maquereaux et bonites conditionnées dans
            différents formats pour répondre aux besoins des marchés
            professionnels.
          </p>
        </div>

        <div className="mt-12 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="grid gap-5 lg:grid-cols-2">
            <div>
              <p className="mb-3 text-sm font-bold text-slate-900">Marque</p>

              <div className="flex flex-wrap gap-2">
                {brandFilters.map((brand) => (
                  <button
                    key={brand}
                    type="button"
                    onClick={() => setActiveBrand(brand)}
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                      activeBrand === brand
                        ? "bg-sky-600 text-white shadow-sm"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    {brand}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-3 text-sm font-bold text-slate-900">
                Catégorie
              </p>

              <div className="flex flex-wrap gap-2">
                {categoryFilters.map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setActiveCategory(category)}
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                      activeCategory === category
                        ? "bg-slate-900 text-white shadow-sm"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-7 sm:grid-cols-2 xl:grid-cols-3">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-8 text-center text-slate-500">
            Aucun produit trouvé pour ce filtre.
          </div>
        )}

        <div className="mt-16 overflow-hidden rounded-3xl bg-slate-900 p-8 text-white shadow-xl sm:p-10 lg:flex lg:items-center lg:justify-between">
          <div>
            <h3 className="text-2xl font-bold">
              Besoin d’informations sur nos produits ?
            </h3>

            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300">
              Contactez PELAGIC PRO pour plus de détails sur les références, les
              formats disponibles et les possibilités de collaboration.
            </p>
          </div>

          <a
            href="mailto:contact@pelagicpro.com"
            className="mt-6 inline-flex rounded-full bg-sky-500 px-7 py-3 text-sm font-semibold text-white transition hover:bg-sky-400 lg:mt-0"
          >
            Contacter la société
          </a>
        </div>
      </div>
    </section>
  );
}