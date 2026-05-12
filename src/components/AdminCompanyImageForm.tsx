"use client";

import { ChangeEvent, FormEvent, useState } from "react";

type CompanyImage = {
  id: number | string;
  title: string;
  image: string;
  alt?: string;
  order?: number;
  is_active?: boolean;
  created_at?: string;
};

type AdminCompanyImageFormProps = {
  onCompanyImageCreated: (companyImage: CompanyImage) => void;
};

export default function AdminCompanyImageForm({
  onCompanyImageCreated,
}: AdminCompanyImageFormProps) {
  const [title, setTitle] = useState("");
  const [alt, setAlt] = useState("");
  const [order, setOrder] = useState("0");
  const [image, setImage] = useState<File | null>(null);

  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0] || null;
    setImage(file);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setMessage("");

    const token = localStorage.getItem("admin_token");

    if (!token) {
      setMessage("Session admin introuvable. Reconnectez-vous.");
      return;
    }

    if (!title) {
      setMessage("Le titre est obligatoire.");
      return;
    }

    if (!image) {
      setMessage("L'image est obligatoire.");
      return;
    }

    try {
      setIsSubmitting(true);

      const apiUrl =
        process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";

      const formData = new FormData();
      formData.append("title", title);
      formData.append("alt", alt);
      formData.append("order", order);
      formData.append("is_active", "true");
      formData.append("image", image);

      const response = await fetch(`${apiUrl}/company-images/create/`, {
        method: "POST",
        headers: {
          Authorization: `Token ${token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Erreur lors de l’ajout de l’image.");
        return;
      }

      onCompanyImageCreated(data.data);

      setTitle("");
      setAlt("");
      setOrder("0");
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
        Ajouter une image de présentation
      </h2>

      <p className="mt-2 text-sm text-slate-500">
        Ajoutez une image affichée dans la section Présentation de la société.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label className="text-sm font-semibold text-slate-700">Titre</label>

          <input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-sky-500"
            placeholder="Ex : Ligne de production"
          />
        </div>

        <div>
          <label className="text-sm font-semibold text-slate-700">
            Texte alternatif
          </label>

          <input
            type="text"
            value={alt}
            onChange={(event) => setAlt(event.target.value)}
            className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-sky-500"
            placeholder="Ex : Ligne de production Pelagic Pro"
          />
        </div>

        <div>
          <label className="text-sm font-semibold text-slate-700">
            Ordre d’affichage
          </label>

          <input
            type="number"
            value={order}
            onChange={(event) => setOrder(event.target.value)}
            className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-sky-500"
            placeholder="Ex : 1"
          />
        </div>

        <div>
          <label className="text-sm font-semibold text-slate-700">Image</label>

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
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
          {isSubmitting ? "Ajout en cours..." : "Ajouter l’image"}
        </button>
      </form>
    </section>
  );
}