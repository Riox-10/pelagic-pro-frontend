"use client";

import { FormEvent, useState } from "react";

type Certificate = {
  id: number | string;
  name: string;
  image?: string;
  alt?: string;
  created_at?: string;
};

type AdminCertificateFormProps = {
  onCertificateCreated: (certificate: Certificate) => void;
};

export default function AdminCertificateForm({
  onCertificateCreated,
}: AdminCertificateFormProps) {
  const [name, setName] = useState("");
  const [alt, setAlt] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    const token = localStorage.getItem("admin_token");

    if (!token) {
      setErrorMessage("Session admin introuvable. Reconnectez-vous.");
      setIsLoading(false);
      return;
    }

    try {
      const apiUrl =
        process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";

      const formData = new FormData();
      formData.append("name", name);
      formData.append("alt", alt);

      if (image) {
        formData.append("image", image);
      }

      const response = await fetch(`${apiUrl}/certificates/create/`, {
        method: "POST",
        headers: {
          Authorization: `Token ${token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(
          data.message || "Erreur lors de l’ajout du certificat."
        );
        return;
      }

      onCertificateCreated(data.data);
      setSuccessMessage("Certificat ajouté avec succès.");

      setName("");
      setAlt("");
      setImage(null);

      const fileInput = document.getElementById(
        "certificate-image"
      ) as HTMLInputElement | null;

      if (fileInput) {
        fileInput.value = "";
      }
    } catch {
      setErrorMessage("Impossible de contacter le serveur Django.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-600">
          Ajouter certificat
        </p>

        <h2 className="mt-2 text-2xl font-bold text-slate-900">
          Nouveau certificat
        </h2>

        <p className="mt-3 text-sm text-slate-500">
          Ajoutez un certificat directement depuis le tableau de bord admin.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-5">
        <div>
          <label className="text-sm font-semibold text-slate-700">
            Nom du certificat
          </label>

          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
            className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
            placeholder="Ex: ONSSA"
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
            className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
            placeholder="Ex: Certification ONSSA"
          />
        </div>

        <div>
          <label className="text-sm font-semibold text-slate-700">
            Image du certificat
          </label>

          <input
            id="certificate-image"
            type="file"
            accept="image/*"
            onChange={(event) => setImage(event.target.files?.[0] || null)}
            className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm"
          />
        </div>

        {successMessage && (
          <div className="rounded-2xl bg-green-50 px-4 py-3 text-sm font-semibold text-green-700">
            {successMessage}
          </div>
        )}

        {errorMessage && (
          <div className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
            {errorMessage}
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-full bg-slate-950 px-6 py-3 text-sm font-bold text-white transition hover:bg-sky-600 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoading ? "Ajout en cours..." : "Ajouter le certificat"}
        </button>
      </form>
    </section>
  );
}