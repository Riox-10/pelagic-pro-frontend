"use client";

import { useState } from "react";

type CompanyFact = {
  id: number | string;
  label: string;
  value: string;
  description: string;
  order?: number;
  is_active?: boolean;
  created_at?: string;
};

type AdminCompanyFactsProps = {
  companyFacts: CompanyFact[];
  onCompanyFactUpdated: (companyFact: CompanyFact) => void;
  onCompanyFactDeleted: (companyFactId: number | string) => void;
};

export default function AdminCompanyFacts({
  companyFacts,
  onCompanyFactUpdated,
  onCompanyFactDeleted,
}: AdminCompanyFactsProps) {
  const [editingId, setEditingId] = useState<number | string | null>(null);
  const [editLabel, setEditLabel] = useState("");
  const [editValue, setEditValue] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editOrder, setEditOrder] = useState("0");
  const [message, setMessage] = useState("");

  function startEdit(companyFact: CompanyFact) {
    setEditingId(companyFact.id);
    setEditLabel(companyFact.label);
    setEditValue(companyFact.value);
    setEditDescription(companyFact.description || "");
    setEditOrder(String(companyFact.order || 0));
    setMessage("");
  }

  function cancelEdit() {
    setEditingId(null);
    setEditLabel("");
    setEditValue("");
    setEditDescription("");
    setEditOrder("0");
    setMessage("");
  }

  async function handleUpdate(companyFactId: number | string) {
    const token = localStorage.getItem("admin_token");

    if (!token) {
      setMessage("Session admin introuvable. Reconnectez-vous.");
      return;
    }

    if (!editLabel || !editValue) {
      setMessage("Le titre et la valeur sont obligatoires.");
      return;
    }

    try {
      const apiUrl =
        process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";

      const response = await fetch(
        `${apiUrl}/company-facts/${companyFactId}/update/`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
          body: JSON.stringify({
            label: editLabel,
            value: editValue,
            description: editDescription,
            order: Number(editOrder) || 0,
            is_active: true,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Erreur lors de la modification.");
        return;
      }

      onCompanyFactUpdated(data.data);
      cancelEdit();
    } catch {
      setMessage("Impossible de contacter le serveur Django.");
    }
  }

  async function handleDelete(companyFactId: number | string) {
    const confirmDelete = window.confirm(
      "Voulez-vous vraiment supprimer cette information ?"
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
        `${apiUrl}/company-facts/${companyFactId}/delete/`,
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

      onCompanyFactDeleted(companyFactId);
    } catch {
      alert("Impossible de contacter le serveur Django.");
    }
  }

  return (
    <section className="rounded-3xl bg-white p-6 shadow-sm">
      <h2 className="text-xl font-bold text-slate-900">
        Fiche technique société
      </h2>

      <p className="mt-2 text-sm text-slate-500">
        Liste des informations affichées dans la section fiche technique de la
        page d’accueil.
      </p>

      {message && (
        <p className="mt-4 rounded-2xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
          {message}
        </p>
      )}

      <div className="mt-6 space-y-4">
        {companyFacts.length === 0 ? (
          <p className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-500">
            Aucune information ajoutée depuis Django pour le moment.
          </p>
        ) : (
          companyFacts.map((companyFact) => (
            <article
              key={companyFact.id}
              className="rounded-2xl border border-slate-200 p-4"
            >
              {editingId === companyFact.id ? (
                <div className="space-y-3">
                  <input
                    type="text"
                    value={editLabel}
                    onChange={(event) => setEditLabel(event.target.value)}
                    className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-sky-500"
                    placeholder="Titre"
                  />

                  <input
                    type="text"
                    value={editValue}
                    onChange={(event) => setEditValue(event.target.value)}
                    className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-sky-500"
                    placeholder="Valeur"
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
                    type="number"
                    value={editOrder}
                    onChange={(event) => setEditOrder(event.target.value)}
                    className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-sky-500"
                    placeholder="Ordre"
                  />

                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => handleUpdate(companyFact.id)}
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
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold text-sky-600">
                        {companyFact.label}
                      </p>

                      <h3 className="mt-2 text-xl font-bold text-slate-900">
                        {companyFact.value}
                      </h3>
                    </div>

                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
                      Ordre {companyFact.order || 0}
                    </span>
                  </div>

                  {companyFact.description && (
                    <p className="mt-3 text-sm leading-7 text-slate-500">
                      {companyFact.description}
                    </p>
                  )}

                  <div className="mt-4 flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => startEdit(companyFact)}
                      className="rounded-full bg-sky-50 px-4 py-2 text-xs font-bold text-sky-700 transition hover:bg-sky-600 hover:text-white"
                    >
                      Modifier
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDelete(companyFact.id)}
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