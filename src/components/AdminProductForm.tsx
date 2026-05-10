"use client";

import { FormEvent, useState } from "react";

type Product = {
  id: number | string;
  name: string;
  brand: string;
  category: string;
  weight?: string;
  packaging?: string;
  description?: string;
  image?: string;
  is_active?: boolean;
  created_at?: string;
};

type AdminProductFormProps = {
  onProductCreated: (product: Product) => void;
};

export default function AdminProductForm({
  onProductCreated,
}: AdminProductFormProps) {
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("PALMA");
  const [category, setCategory] = useState("Sardines");
  const [weight, setWeight] = useState("");
  const [packaging, setPackaging] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [isActive, setIsActive] = useState(true);

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
      formData.append("brand", brand);
      formData.append("category", category);
      formData.append("weight", weight);
      formData.append("packaging", packaging);
      formData.append("description", description);
      formData.append("is_active", String(isActive));

      if (image) {
        formData.append("image", image);
      }

      const response = await fetch(`${apiUrl}/products/create/`, {
        method: "POST",
        headers: {
          Authorization: `Token ${token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data.message || "Erreur lors de l’ajout du produit.");
        return;
      }

      onProductCreated(data.data);
      setSuccessMessage("Produit ajouté avec succès.");

      setName("");
      setBrand("PALMA");
      setCategory("Sardines");
      setWeight("");
      setPackaging("");
      setDescription("");
      setImage(null);
      setIsActive(true);

      const fileInput = document.getElementById(
        "product-image"
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
          Ajouter produit
        </p>

        <h2 className="mt-2 text-2xl font-bold text-slate-900">
          Nouveau produit
        </h2>

        <p className="mt-3 text-sm text-slate-500">
          Ajoutez un produit directement depuis le tableau de bord admin.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-5">
        <div>
          <label className="text-sm font-semibold text-slate-700">
            Nom du produit
          </label>
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
            className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
            placeholder="Ex: Sardines à l’huile végétale"
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="text-sm font-semibold text-slate-700">
              Marque
            </label>
            <select
              value={brand}
              onChange={(event) => setBrand(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
            >
              <option value="PALMA">PALMA</option>
              <option value="Lyra">Lyra</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-semibold text-slate-700">
              Catégorie
            </label>
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
            >
              <option value="Sardines">Sardines</option>
              <option value="Maquereaux">Maquereaux</option>
              <option value="Bonites">Bonites</option>
            </select>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="text-sm font-semibold text-slate-700">
              Poids
            </label>
            <input
              type="text"
              value={weight}
              onChange={(event) => setWeight(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
              placeholder="Ex: 125g"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-slate-700">
              Packaging
            </label>
            <input
              type="text"
              value={packaging}
              onChange={(event) => setPackaging(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
              placeholder="Ex: x50"
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-semibold text-slate-700">
            Description
          </label>
          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            rows={4}
            className="mt-2 w-full resize-none rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
            placeholder="Description courte du produit..."
          />
        </div>

        <div>
          <label className="text-sm font-semibold text-slate-700">
            Image du produit
          </label>
          <input
            id="product-image"
            type="file"
            accept="image/*"
            onChange={(event) => setImage(event.target.files?.[0] || null)}
            className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm"
          />
        </div>

        <label className="flex items-center gap-3 text-sm font-semibold text-slate-700">
          <input
            type="checkbox"
            checked={isActive}
            onChange={(event) => setIsActive(event.target.checked)}
          />
          Produit actif
        </label>

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
          {isLoading ? "Ajout en cours..." : "Ajouter le produit"}
        </button>
      </form>
    </section>
  );
}