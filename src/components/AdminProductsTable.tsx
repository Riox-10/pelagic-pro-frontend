"use client";

import Image from "next/image";
import { ChangeEvent, useState } from "react";

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

type AdminProductsTableProps = {
  products: readonly Product[];
  onProductUpdated: (product: Product) => void;
  onProductDeleted: (productId: number | string) => void;
};

export default function AdminProductsTable({
  products,
  onProductUpdated,
  onProductDeleted,
}: AdminProductsTableProps) {
  const [editingId, setEditingId] = useState<number | string | null>(null);

  const [editName, setEditName] = useState("");
  const [editBrand, setEditBrand] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [editWeight, setEditWeight] = useState("");
  const [editPackaging, setEditPackaging] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editImage, setEditImage] = useState<File | null>(null);
  const [message, setMessage] = useState("");

  function startEdit(product: Product) {
    setEditingId(product.id);
    setEditName(product.name);
    setEditBrand(product.brand);
    setEditCategory(product.category);
    setEditWeight(product.weight || "");
    setEditPackaging(product.packaging || "");
    setEditDescription(product.description || "");
    setEditImage(null);
    setMessage("");
  }

  function cancelEdit() {
    setEditingId(null);
    setEditName("");
    setEditBrand("");
    setEditCategory("");
    setEditWeight("");
    setEditPackaging("");
    setEditDescription("");
    setEditImage(null);
    setMessage("");
  }

  function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0] || null;
    setEditImage(file);
  }

  async function handleUpdate(productId: number | string) {
    const token = localStorage.getItem("admin_token");

    if (!token) {
      setMessage("Session admin introuvable. Reconnectez-vous.");
      return;
    }

    if (!editName || !editBrand || !editCategory) {
      setMessage("Le nom, la marque et la catégorie sont obligatoires.");
      return;
    }

    try {
      const apiUrl =
        process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";

      const formData = new FormData();
      formData.append("name", editName);
      formData.append("brand", editBrand);
      formData.append("category", editCategory);
      formData.append("weight", editWeight);
      formData.append("packaging", editPackaging);
      formData.append("description", editDescription);
      formData.append("is_active", "true");

      if (editImage) {
        formData.append("image", editImage);
      }

      const response = await fetch(`${apiUrl}/products/${productId}/update/`, {
        method: "PATCH",
        headers: {
          Authorization: `Token ${token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Erreur lors de la modification.");
        return;
      }

      onProductUpdated(data.data);
      cancelEdit();
    } catch {
      setMessage("Impossible de contacter le serveur Django.");
    }
  }

  async function handleDelete(productId: number | string) {
    const confirmDelete = window.confirm(
      "Voulez-vous vraiment supprimer ce produit ?"
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

      const response = await fetch(`${apiUrl}/products/${productId}/delete/`, {
        method: "DELETE",
        headers: {
          Authorization: `Token ${token}`,
        },
      });

      if (!response.ok) {
        alert("Impossible de supprimer ce produit.");
        return;
      }

      onProductDeleted(productId);
    } catch {
      alert("Erreur serveur lors de la suppression.");
    }
  }

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-600">
          Produits
        </p>

        <h2 className="mt-2 text-2xl font-bold text-slate-900">
          Produits enregistrés
        </h2>

        <p className="mt-3 text-sm text-slate-500">
          Liste des produits récupérés depuis Django.
        </p>
      </div>

      {message && (
        <p className="mt-4 rounded-2xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
          {message}
        </p>
      )}

      <div className="mt-6 overflow-hidden rounded-3xl border border-slate-100">
        {products.length === 0 ? (
          <div className="bg-slate-50 px-4 py-5 text-sm text-slate-500">
            Aucun produit enregistré dans Django pour le moment.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-100">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-[0.15em] text-slate-500">
                    Image
                  </th>
                  <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-[0.15em] text-slate-500">
                    Produit
                  </th>
                  <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-[0.15em] text-slate-500">
                    Marque
                  </th>
                  <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-[0.15em] text-slate-500">
                    Catégorie
                  </th>
                  <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-[0.15em] text-slate-500">
                    Format
                  </th>
                  <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-[0.15em] text-slate-500">
                    Statut
                  </th>
                  <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-[0.15em] text-slate-500">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100 bg-white">
                {products.map((product) => {
                  const productImage =
                    product.image && product.image.trim() !== ""
                      ? product.image
                      : "/images/logo.png";

                  return (
                    <tr key={product.id}>
                      {editingId === product.id ? (
                        <td colSpan={7} className="bg-slate-50 px-5 py-5">
                          <div className="grid gap-4 lg:grid-cols-[180px_1fr]">
                            <div className="relative h-36 overflow-hidden rounded-2xl bg-white">
                              <Image
                                src={productImage}
                                alt={product.name}
                                fill
                                className="object-contain p-3"
                                sizes="180px"
                              />
                            </div>

                            <div className="space-y-3">
                              <div className="grid gap-3 md:grid-cols-2">
                                <input
                                  type="text"
                                  value={editName}
                                  onChange={(event) =>
                                    setEditName(event.target.value)
                                  }
                                  className="rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-sky-500"
                                  placeholder="Nom du produit"
                                />

                                <input
                                  type="text"
                                  value={editBrand}
                                  onChange={(event) =>
                                    setEditBrand(event.target.value)
                                  }
                                  className="rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-sky-500"
                                  placeholder="Marque"
                                />

                                <input
                                  type="text"
                                  value={editCategory}
                                  onChange={(event) =>
                                    setEditCategory(event.target.value)
                                  }
                                  className="rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-sky-500"
                                  placeholder="Catégorie"
                                />

                                <input
                                  type="text"
                                  value={editWeight}
                                  onChange={(event) =>
                                    setEditWeight(event.target.value)
                                  }
                                  className="rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-sky-500"
                                  placeholder="Poids / format"
                                />

                                <input
                                  type="text"
                                  value={editPackaging}
                                  onChange={(event) =>
                                    setEditPackaging(event.target.value)
                                  }
                                  className="rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-sky-500"
                                  placeholder="Packaging"
                                />

                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={handleImageChange}
                                  className="rounded-2xl border border-slate-200 px-4 py-3 text-sm"
                                />
                              </div>

                              <textarea
                                value={editDescription}
                                onChange={(event) =>
                                  setEditDescription(event.target.value)
                                }
                                className="min-h-24 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-sky-500"
                                placeholder="Description"
                              />

                              <div className="flex flex-wrap gap-2">
                                <button
                                  type="button"
                                  onClick={() => handleUpdate(product.id)}
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
                          </div>
                        </td>
                      ) : (
                        <>
                          <td className="px-5 py-4">
                            <div className="relative h-16 w-24 overflow-hidden rounded-xl bg-slate-50">
                              <Image
                                src={productImage}
                                alt={product.name}
                                fill
                                className="object-contain p-2"
                                sizes="96px"
                              />
                            </div>
                          </td>

                          <td className="px-5 py-4">
                            <p className="text-sm font-bold text-slate-900">
                              {product.name}
                            </p>
                            {product.description && (
                              <p className="mt-1 line-clamp-2 text-xs text-slate-500">
                                {product.description}
                              </p>
                            )}
                          </td>

                          <td className="px-5 py-4 text-sm font-semibold text-slate-700">
                            {product.brand}
                          </td>

                          <td className="px-5 py-4 text-sm text-slate-600">
                            {product.category}
                          </td>

                          <td className="px-5 py-4 text-sm text-slate-600">
                            <p>{product.weight || "-"}</p>
                            <p>{product.packaging || "-"}</p>
                          </td>

                          <td className="px-5 py-4">
                            <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
                              {product.is_active ? "Actif" : "Inactif"}
                            </span>
                          </td>

                          <td className="px-5 py-4">
                            <div className="flex flex-col gap-2">
                              <button
                                type="button"
                                onClick={() => startEdit(product)}
                                className="rounded-full bg-sky-50 px-4 py-2 text-xs font-bold text-sky-700 transition hover:bg-sky-600 hover:text-white"
                              >
                                Modifier
                              </button>

                              <button
                                type="button"
                                onClick={() => handleDelete(product.id)}
                                className="rounded-full bg-red-50 px-4 py-2 text-xs font-bold text-red-700 transition hover:bg-red-600 hover:text-white"
                              >
                                Supprimer
                              </button>
                            </div>
                          </td>
                        </>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}