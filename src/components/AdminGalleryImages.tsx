"use client";

import Image from "next/image";
import { ChangeEvent, useState } from "react";

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
  onGalleryImageUpdated: (galleryImage: GalleryImage) => void;
  onGalleryImageDeleted: (galleryImageId: number | string) => void;
};

export default function AdminGalleryImages({
  galleryImages,
  onGalleryImageUpdated,
  onGalleryImageDeleted,
}: AdminGalleryImagesProps) {
  const [editingId, setEditingId] = useState<number | string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editImage, setEditImage] = useState<File | null>(null);
  const [message, setMessage] = useState("");

  function startEdit(galleryImage: GalleryImage) {
    setEditingId(galleryImage.id);
    setEditTitle(galleryImage.title);
    setEditDescription(galleryImage.description || "");
    setEditImage(null);
    setMessage("");
  }

  function cancelEdit() {
    setEditingId(null);
    setEditTitle("");
    setEditDescription("");
    setEditImage(null);
    setMessage("");
  }

  function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0] || null;
    setEditImage(file);
  }

  async function handleUpdate(galleryImageId: number | string) {
    const token = localStorage.getItem("admin_token");

    if (!token) {
      setMessage("Session admin introuvable. Reconnectez-vous.");
      return;
    }

    if (!editTitle) {
      setMessage("Le titre est obligatoire.");
      return;
    }

    try {
      const apiUrl =
        process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";

      const formData = new FormData();
      formData.append("title", editTitle);
      formData.append("description", editDescription);
      formData.append("is_active", "true");

      if (editImage) {
        formData.append("image", editImage);
      }

      const response = await fetch(
        `${apiUrl}/gallery-images/${galleryImageId}/update/`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Token ${token}`,
          },
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Erreur lors de la modification.");
        return;
      }

      onGalleryImageUpdated(data.data);
      cancelEdit();
    } catch {
      setMessage("Impossible de contacter le serveur Django.");
    }
  }

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
        Liste des images affichées dans la galerie de la page d’accueil.
      </p>

      {message && (
        <p className="mt-4 rounded-2xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
          {message}
        </p>
      )}

      <div className="mt-6 space-y-4">
        {galleryImages.length === 0 ? (
          <p className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-500">
            Aucune image ajoutée depuis Django pour le moment.
          </p>
        ) : (
          galleryImages.map((item) => (
            <article
              key={item.id}
              className="rounded-2xl border border-slate-200 p-4"
            >
              {editingId === item.id ? (
                <div className="space-y-4">
                  <div className="relative h-28 w-full overflow-hidden rounded-2xl bg-slate-100">
                    <Image
                      src={item.image || "/images/logo.png"}
                      alt={item.title}
                      fill
                      className="object-contain p-2"
                      sizes="300px"
                    />
                  </div>

                  <input
                    type="text"
                    value={editTitle}
                    onChange={(event) => setEditTitle(event.target.value)}
                    className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-sky-500"
                    placeholder="Titre"
                  />

                  <textarea
                    value={editDescription}
                    onChange={(event) =>
                      setEditDescription(event.target.value)
                    }
                    className="min-h-24 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-sky-500"
                    placeholder="Description"
                  />

                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm"
                  />

                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => handleUpdate(item.id)}
                      className="rounded-full bg-sky-600 px-4 py-2 text-xs font-bold text-white transition hover:bg-sky-500"
                    >
                      Enregistrer
                    </button>

                    <button
                      type="button"
                      onClick={cancelEdit}
                      className="rounded-full bg-slate-100 px-4 py-2 text-xs font-bold text-slate-700 transition hover:bg-slate-200"
                    >
                      Annuler
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-4">
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

                  <div className="flex flex-col gap-2">
                    <button
                      type="button"
                      onClick={() => startEdit(item)}
                      className="rounded-full bg-sky-50 px-4 py-2 text-xs font-bold text-sky-700 transition hover:bg-sky-600 hover:text-white"
                    >
                      Modifier
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDelete(item.id)}
                      className="rounded-full bg-red-50 px-4 py-2 text-xs font-bold text-red-600 transition hover:bg-red-600 hover:text-white"
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
              )}
            </article>
          ))
        )}
      </div>
    </section>
  );
}