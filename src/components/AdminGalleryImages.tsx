"use client";

import Image from "next/image";

type GalleryImage = {
  id: number | string;
  title: string;
  image: string;
  description?: string;
  is_active?: boolean;
  created_at?: string;
};

type AdminGalleryImagesProps = {
  galleryImages: GalleryImage[];
  onGalleryImageDeleted: (galleryImageId: number | string) => void;
};

export default function AdminGalleryImages({
  galleryImages,
  onGalleryImageDeleted,
}: AdminGalleryImagesProps) {
  async function handleDelete(galleryImageId: number | string) {
    const confirmDelete = window.confirm(
      "Voulez-vous vraiment supprimer cette image ?"
    );

    if (!confirmDelete) {
      return;
    }

    const token = localStorage.getItem("admin_token");

    if (!token) {
      alert("Vous devez être connecté.");
      return;
    }

    try {
      const apiUrl =
        process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";

      const response = await fetch(
        `${apiUrl}/gallery-images/${galleryImageId}/delete/`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      if (!response.ok) {
        alert("Erreur lors de la suppression.");
        return;
      }

      onGalleryImageDeleted(galleryImageId);
    } catch {
      alert("Impossible de contacter le serveur Django.");
    }
  }

  return (
    <section className="rounded-3xl bg-white p-6 shadow-sm">
      <h2 className="text-xl font-bold text-slate-900">Galerie</h2>

      <p className="mt-2 text-sm text-slate-500">
        Liste des images ajoutées depuis le dashboard administrateur.
      </p>

      <div className="mt-6 space-y-4">
        {galleryImages.length === 0 ? (
          <p className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-500">
            Aucune image ajoutée depuis Django pour le moment.
          </p>
        ) : (
          galleryImages.map((item) => (
            <article
              key={item.id}
              className="flex items-center gap-4 rounded-2xl border border-slate-200 p-4"
            >
              <div className="relative h-20 w-24 shrink-0 overflow-hidden rounded-xl bg-slate-100">
                <Image
                  src={item.image || "/images/logo.png"}
                  alt={item.title}
                  fill
                  className="object-contain p-2"
                  sizes="96px"
                />
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="truncate text-sm font-bold text-slate-900">
                  {item.title}
                </h3>

                {item.description && (
                  <p className="mt-1 line-clamp-2 text-xs text-slate-500">
                    {item.description}
                  </p>
                )}
              </div>

              <button
                type="button"
                onClick={() => handleDelete(item.id)}
                className="rounded-full bg-red-50 px-4 py-2 text-xs font-bold text-red-600 transition hover:bg-red-600 hover:text-white"
              >
                Supprimer
              </button>
            </article>
          ))
        )}
      </div>
    </section>
  );
}