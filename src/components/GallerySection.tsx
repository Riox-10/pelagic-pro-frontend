"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

type GalleryItem = {
  id: number | string;
  title: string;
  image: string;
  description?: string;
  is_active?: boolean;
  created_at?: string;
};

const localGalleryItems: GalleryItem[] = [
  {
    id: "local-1",
    title: "Sardines",
    image: "/gallery/sardines-assiette.png",
  },
  {
    id: "local-2",
    title: "Bonite",
    image: "/gallery/bonite-assiette.png",
  },
  {
    id: "local-3",
    title: "Filets de maquereaux",
    image: "/gallery/filets-maquereaux.png",
  },
  {
    id: "local-4",
    title: "Sardines à la sauce tomate",
    image: "/gallery/sardines-sauce-tomate.webp",
  },
  {
    id: "local-5",
    title: "Sardines au citron",
    image: "/gallery/sardines-citron-pain.webp",
  },
  {
    id: "local-6",
    title: "Sardines toast",
    image: "/gallery/sardines-toast.webp",
  },
  {
    id: "local-7",
    title: "Sardines à l’huile",
    image: "/gallery/sardines-boite-huile.webp",
  },
  {
    id: "local-8",
    title: "Sardines en conserve",
    image: "/gallery/sardines-boite-table.webp",
  },
  {
    id: "local-9",
    title: "Maquereaux",
    image: "/gallery/maquereaux-boite.png",
  },
  {
    id: "local-10",
    title: "Thon et bonite",
    image: "/gallery/thon-bonite-filet.png",
  },
];

export default function GallerySection() {
  const [djangoGalleryItems, setDjangoGalleryItems] = useState<GalleryItem[]>(
    []
  );

  useEffect(() => {
    async function fetchGalleryImages() {
      try {
        const apiUrl =
          process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";

        const response = await fetch(`${apiUrl}/gallery-images/`);

        if (!response.ok) {
          return;
        }

        const data = await response.json();

        if (Array.isArray(data)) {
          setDjangoGalleryItems(
            data.map((item) => ({
              ...item,
              id: `db-${item.id}`,
              image: item.image || "/images/logo.png",
              description: item.description || "",
            }))
          );
        }
      } catch {
        setDjangoGalleryItems([]);
      }
    }

    fetchGalleryImages();
  }, []);

  const galleryItems = useMemo(() => {
    const allItems = [...localGalleryItems, ...djangoGalleryItems];

    return allItems.filter(
      (item, index, array) =>
        index ===
        array.findIndex(
          (currentItem) =>
            currentItem.title.toLowerCase().trim() ===
            item.title.toLowerCase().trim()
        )
    );
  }, [djangoGalleryItems]);

  return (
    <section className="bg-slate-50 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-sky-600">
            Galerie
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Des produits de la mer riches et variés
          </h2>

          <p className="mt-5 text-base leading-8 text-slate-600">
            Les produits de la mer, tels que les sardines, les maquereaux, la
            bonite et le thon, occupent une place importante dans une
            alimentation équilibrée. Ils sont appréciés pour leur richesse en
            protéines, leur valeur nutritionnelle et leur goût. Grâce à leur
            diversité, ils permettent de proposer des produits savoureux,
            pratiques et adaptés aux besoins des consommateurs.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {galleryItems.map((item) => (
            <article
              key={item.id}
              className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative h-48 bg-white">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-contain p-3 transition duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                />
              </div>

              <div className="p-4 text-center">
                <h3 className="text-sm font-bold text-slate-900">
                  {item.title}
                </h3>

                {item.description && (
                  <p className="mt-2 line-clamp-3 text-xs leading-6 text-slate-500">
                    {item.description}
                  </p>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}