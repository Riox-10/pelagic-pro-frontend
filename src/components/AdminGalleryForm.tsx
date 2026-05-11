"use client";

import { FormEvent, useState } from "react";

type GalleryImage = {
  id: number | string;
  title: string;
  image: string;
  description?: string;
  is_active?: boolean;
  created_at?: string;
};

type AdminGalleryFormProps = {
  onGalleryImageCreated: (galleryImage: GalleryImage) => void;
};

export default function AdminGalleryForm({
  onGalleryImageCreated,
}: AdminGalleryFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");

    const token = localStorage.getItem("admin_token");

    if (!token) {
      setMessage("Vous devez être connecté.");
      return;
    }

    if (!title || !image) {
      setMessage("Le titre et l'image sont obligatoires.");
      return;
    }

    try {
      setIsSubmitting(true);

      const apiUrl =
        process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";

      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("image", image);
      formData.append("is_active", "true");

      const response = await fetch(`${apiUrl}/gallery-images/create/`, {
        method: "POST",
        headers: {
          Authorization: `Token ${token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Erreur lors de l'ajout de l'image.");
        return;
      }

      onGalleryImageCreated(data.data);

      setTitle("");
      setDescription("");
      setImage(null);
      setMessage("Image ajoutée avec succès.");
    } catch {
      setMessage("Impossible de contacter le serveur Django.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="rounded-3xl bg-white p-6 shadow-sm">
      <h2 className="text-xl font-bold text-slate-900">
        Ajouter une image Galerie
      </h2>

      <p className="mt-2 text-sm text-slate-500">
        Ajoutez des images qui seront affichées dans la galerie de la page
        d’accueil.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label className="text-sm font-semibold text-slate-700">Titre</label>
          <input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-sky-500"
            placeholder="Ex : Sardines à l’huile"
          />
        </div>

        <div>
          <label className="text-sm font-semibold text-slate-700">
            Description
          </label>
          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            className="mt-2 min-h-24 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-sky-500"
            placeholder="Petite description optionnelle"
          />
        </div>

        <div>
          <label className="text-sm font-semibold text-slate-700">Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(event) =>
              setImage(event.target.files ? event.target.files[0] : null)
            }
            className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm"
          />
        </div>

        {message && (
          <p className="rounded-2xl bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-700">
            {message}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-full bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-sky-600 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Ajout en cours..." : "Ajouter l'image"}
        </button>
      </form>
    </section>
  );
}