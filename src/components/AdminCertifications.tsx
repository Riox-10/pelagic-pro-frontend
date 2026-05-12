"use client";

import Image from "next/image";
import { ChangeEvent, useState } from "react";

type Certificate = {
  id: number | string;
  name: string;
  image?: string;
  alt?: string;
  created_at?: string;
};

type AdminCertificationsProps = {
  certificates: readonly Certificate[];
  onCertificateUpdated: (certificate: Certificate) => void;
  onCertificateDeleted: (certificateId: number | string) => void;
};

export default function AdminCertifications({
  certificates,
  onCertificateUpdated,
  onCertificateDeleted,
}: AdminCertificationsProps) {
  const [editingId, setEditingId] = useState<number | string | null>(null);
  const [editName, setEditName] = useState("");
  const [editAlt, setEditAlt] = useState("");
  const [editImage, setEditImage] = useState<File | null>(null);
  const [message, setMessage] = useState("");

  function startEdit(certificate: Certificate) {
    setEditingId(certificate.id);
    setEditName(certificate.name);
    setEditAlt(certificate.alt || "");
    setEditImage(null);
    setMessage("");
  }

  function cancelEdit() {
    setEditingId(null);
    setEditName("");
    setEditAlt("");
    setEditImage(null);
    setMessage("");
  }

  function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0] || null;
    setEditImage(file);
  }

  async function handleUpdate(certificateId: number | string) {
    const token = localStorage.getItem("admin_token");

    if (!token) {
      setMessage("Session admin introuvable. Reconnectez-vous.");
      return;
    }

    if (!editName) {
      setMessage("Le nom du certificat est obligatoire.");
      return;
    }

    try {
      const apiUrl =
        process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";

      const formData = new FormData();
      formData.append("name", editName);
      formData.append("alt", editAlt);

      if (editImage) {
        formData.append("image", editImage);
      }

      const response = await fetch(
        `${apiUrl}/certificates/${certificateId}/update/`,
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

      onCertificateUpdated(data.data);
      cancelEdit();
    } catch {
      setMessage("Erreur serveur lors de la modification.");
    }
  }

  async function handleDelete(certificateId: number | string) {
    const confirmDelete = window.confirm(
      "Voulez-vous vraiment supprimer ce certificat ?"
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
        `${apiUrl}/certificates/${certificateId}/delete/`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      if (!response.ok) {
        alert("Impossible de supprimer ce certificat.");
        return;
      }

      onCertificateDeleted(certificateId);
    } catch {
      alert("Erreur serveur lors de la suppression.");
    }
  }

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-600">
          Certifications
        </p>

        <h2 className="mt-2 text-2xl font-bold text-slate-900">
          Certificats enregistrés
        </h2>

        <p className="mt-3 text-sm text-slate-500">
          Liste des certificats récupérés depuis Django.
        </p>
      </div>

      {message && (
        <p className="mt-4 rounded-2xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
          {message}
        </p>
      )}

      <div className="mt-6 space-y-3">
        {certificates.length === 0 ? (
          <div className="rounded-2xl bg-slate-50 px-4 py-5 text-sm text-slate-500">
            Aucun certificat enregistré dans Django pour le moment.
          </div>
        ) : (
          certificates.map((certificate) => {
            const certificateImage =
              certificate.image && certificate.image.trim() !== ""
                ? certificate.image
                : "/images/logo.png";

            return (
              <div
                key={certificate.id}
                className="rounded-2xl border border-slate-100 bg-slate-50 p-4"
              >
                {editingId === certificate.id ? (
                  <div className="space-y-4">
                    <div className="relative h-28 w-full overflow-hidden rounded-2xl bg-white">
                      <Image
                        src={certificateImage}
                        alt={certificate.alt || certificate.name}
                        fill
                        className="object-contain p-2"
                        sizes="300px"
                      />
                    </div>

                    <input
                      type="text"
                      value={editName}
                      onChange={(event) => setEditName(event.target.value)}
                      className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-sky-500"
                      placeholder="Nom du certificat"
                    />

                    <input
                      type="text"
                      value={editAlt}
                      onChange={(event) => setEditAlt(event.target.value)}
                      className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-sky-500"
                      placeholder="Texte alternatif"
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
                        onClick={() => handleUpdate(certificate.id)}
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
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="relative h-16 w-24 shrink-0 rounded-xl bg-white">
                        <Image
                          src={certificateImage}
                          alt={certificate.alt || certificate.name}
                          fill
                          className="object-contain p-2"
                          sizes="96px"
                        />
                      </div>

                      <div>
                        <p className="text-sm font-bold text-slate-900">
                          {certificate.name}
                        </p>

                        {certificate.created_at && (
                          <p className="mt-1 text-xs text-slate-500">
                            Ajouté le{" "}
                            {new Date(
                              certificate.created_at
                            ).toLocaleDateString("fr-FR")}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <button
                        type="button"
                        onClick={() => startEdit(certificate)}
                        className="rounded-full bg-sky-50 px-4 py-2 text-xs font-bold text-sky-700 transition hover:bg-sky-600 hover:text-white"
                      >
                        Modifier
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDelete(certificate.id)}
                        className="rounded-full bg-red-50 px-4 py-2 text-xs font-bold text-red-700 transition hover:bg-red-600 hover:text-white"
                      >
                        Supprimer
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}