"use client";

import { FormEvent, useState } from "react";

type CompanyFact = {
  id: number | string;
  label: string;
  value: string;
  description: string;
  order?: number;
  is_active?: boolean;
  created_at?: string;
};

type AdminCompanyFactFormProps = {
  onCompanyFactCreated: (companyFact: CompanyFact) => void;
};

export default function AdminCompanyFactForm({
  onCompanyFactCreated,
}: AdminCompanyFactFormProps) {
  const [label, setLabel] = useState("");
  const [value, setValue] = useState("");
  const [description, setDescription] = useState("");
  const [order, setOrder] = useState("0");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setMessage("");

    const token = localStorage.getItem("admin_token");

    if (!token) {
      setMessage("Session admin introuvable. Reconnectez-vous.");
      return;
    }

    if (!label || !value) {
      setMessage("Le titre et la valeur sont obligatoires.");
      return;
    }

    try {
      setIsSubmitting(true);

      const apiUrl =
        process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";

      const response = await fetch(`${apiUrl}/company-facts/create/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({
          label,
          value,
          description,
          order: Number(order) || 0,
          is_active: true,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Erreur lors de l’ajout de l’information.");
        return;
      }

      onCompanyFactCreated(data.data);

      setLabel("");
      setValue("");
      setDescription("");
      setOrder("0");
      setMessage("Information ajoutée avec succès.");
    } catch {
      setMessage("Impossible de contacter le serveur Django.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="rounded-3xl bg-white p-6 shadow-sm">
      <h2 className="text-xl font-bold text-slate-900">
        Ajouter une information société
      </h2>

      <p className="mt-2 text-sm text-slate-500">
        Ajoutez une information qui sera affichée dans la fiche technique de la
        page d’accueil.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label className="text-sm font-semibold text-slate-700">
            Titre
          </label>

          <input
            type="text"
            value={label}
            onChange={(event) => setLabel(event.target.value)}
            className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-sky-500"
            placeholder="Ex : Année de création"
          />
        </div>

        <div>
          <label className="text-sm font-semibold text-slate-700">
            Valeur
          </label>

          <input
            type="text"
            value={value}
            onChange={(event) => setValue(event.target.value)}
            className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-sky-500"
            placeholder="Ex : 2015"
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
            placeholder="Ex : Société marocaine spécialisée dans les produits de la mer."
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
          {isSubmitting ? "Ajout en cours..." : "Ajouter l’information"}
        </button>
      </form>
    </section>
  );
}