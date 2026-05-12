"use client";

import Image from "next/image";
import { ChangeEvent, useState } from "react";

type CompanyImage = {
  id: number | string;
  title: string;
  image: string;
  alt?: string;
  order?: number;
  is_active?: boolean;
  created_at?: string;
};

type AdminCompanyImagesProps = {
  companyImages: CompanyImage[];
  onCompanyImageUpdated: (companyImage: CompanyImage) => void;
  onCompanyImageDeleted: (companyImageId: number | string) => void;
};

export default function AdminCompanyImages({
  companyImages,
  onCompanyImageUpdated,
  onCompanyImageDeleted,
}: AdminCompanyImagesProps) {
  const [editingId, setEditingId] = useState<number | string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editAlt, setEditAlt] = useState("");
  const [editOrder, setEditOrder] = useState("0");
  const [editImage, setEditImage] = useState<File | null>(null);
  const [message, setMessage] = useState("");

  function startEdit(companyImage: CompanyImage) {
    setEditingId(companyImage.id);
    setEditTitle(companyImage.title);
    setEditAlt(companyImage.alt || "");
    setEditOrder(String(companyImage.order || 0));
    setEditImage(null);
    setMessage("");
  }

  function cancelEdit() {
    setEditingId(null);
    setEditTitle("");
    setEditAlt("");
    setEditOrder("0");
    setEditImage(null);
    setMessage("");
  }

  function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0] || null;
    setEditImage(file);
  }

  async function handleUpdate(companyImageId: number | string) {
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
      formData.append("alt", editAlt);
      formData.append("order", editOrder);
      formData.append("is_active", "true");

      if (editImage) {
        formData.append("image", editImage);
      }

      const response = await fetch(
        `${apiUrl}/company-images/${companyImageId}/update/`,
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

      onCompanyImageUpdated(data.data);
      cancelEdit();
    } catch {
      setMessage("Impossible de contacter le serveur Django.");
    }
  }

  async function handleDelete(companyImageId: number | string) {
    const confirmDelete = window.confirm(
      "Voulez-vous vraiment supprimer cette image ?"
    );

    if (!confirmDelete) {
      return;
    }

    const token = localStorage.getItem("admin_token");

    if (!token) {
      alert("Session admin introuvable. Reconnectez-vous.");
      return;
    }

    try {
      const apiUrl =
        process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";

      const response = await fetch(
        `${apiUrl}/company-images/${companyImageId}/delete/`,
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

      onCompanyImageDeleted(companyImageId);
    } catch {
      alert("Impossible de contacter le serveur Django.");
    }
  }

  return (
    <section className="rounded-3xl bg-white p-6 shadow-sm">
      <h2 className="text-xl font-bold text-slate-900">
        Images de présentation société
      </h2>

      <p className="mt-2 text-sm text-slate-500">
        Liste des images affichées dans la section Présentation de la société.
      </p>

      {message && (
        <p className="mt-4 rounded-2xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
          {message}
        </p>
      )}

      <div className="mt-6 space-y-4">
        {companyImages.length === 0 ? (
          <p className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-500">
            Aucune image de présentation ajoutée pour le moment.
          </p>
        ) : (
          companyImages.map((item) => (
            <article
              key={item.id}
              className="rounded-2xl border border-slate-200 p-4"
            >
              {editingId === item.id ? (
                <div className="space-y-4">
                  <div className="relative h-32 w-full overflow-hidden rounded-2xl bg-slate-100">
                    <Image
                      src={item.image || "/images/logo.png"}
                      alt={item.alt || item.title}
                      fill
                      className="object-cover"
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

                  <input
                    type="text"
                    value={editAlt}
                    onChange={(event) => setEditAlt(event.target.value)}
                    className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-sky-500"
                    placeholder="Texte alternatif"
                  />

                  <input
                    type="number"
                    value={editOrder}
                    onChange={(event) => setEditOrder(event.target.value)}
                    className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-sky-500"
                    placeholder="Ordre"
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
                  <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-xl bg-slate-100">
                    <Image
                      src={item.image || "/images/logo.png"}
                      alt={item.alt || item.title}
                      fill
                      className="object-cover"
                      sizes="112px"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="truncate text-sm font-bold text-slate-900">
                      {item.title}
                    </h3>

                    <p className="mt-1 text-xs text-slate-500">
                      Ordre {item.order || 0}
                    </p>

                    {item.alt && (
                      <p className="mt-1 line-clamp-2 text-xs text-slate-500">
                        {item.alt}
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