import Image from "next/image";

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
  onProductDeleted: (productId: number | string) => void;
};

export default function AdminProductsTable({
  products,
  onProductDeleted,
}: AdminProductsTableProps) {
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

      <div className="mt-6 overflow-hidden rounded-2xl border border-slate-100">
        {products.length === 0 ? (
          <div className="bg-slate-50 px-4 py-6 text-center text-sm text-slate-500">
            Aucun produit enregistré dans Django pour le moment.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-100">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                    Image
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                    Produit
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                    Marque
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                    Catégorie
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                    Format
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                    Statut
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
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
                      <td className="px-4 py-4">
                        <div className="relative h-14 w-20 rounded-xl bg-slate-50">
                          <Image
                            src={productImage}
                            alt={product.name}
                            fill
                            className="object-contain p-2"
                            sizes="80px"
                          />
                        </div>
                      </td>

                      <td className="px-4 py-4">
                        <p className="text-sm font-bold text-slate-900">
                          {product.name}
                        </p>
                        {product.description && (
                          <p className="mt-1 line-clamp-2 text-xs text-slate-500">
                            {product.description}
                          </p>
                        )}
                      </td>

                      <td className="px-4 py-4 text-sm font-semibold text-slate-700">
                        {product.brand}
                      </td>

                      <td className="px-4 py-4 text-sm text-slate-600">
                        {product.category}
                      </td>

                      <td className="px-4 py-4 text-sm text-slate-600">
                        <div className="flex flex-col gap-1">
                          {product.weight && <span>{product.weight}</span>}
                          {product.packaging && (
                            <span>{product.packaging}</span>
                          )}
                        </div>
                      </td>

                      <td className="px-4 py-4">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-bold ${
                            product.is_active === false
                              ? "bg-red-50 text-red-700"
                              : "bg-green-50 text-green-700"
                          }`}
                        >
                          {product.is_active === false ? "Inactif" : "Actif"}
                        </span>
                      </td>

                      <td className="px-4 py-4">
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="rounded-full bg-red-50 px-4 py-2 text-xs font-bold text-red-700 transition hover:bg-red-600 hover:text-white"
                        >
                          Supprimer
                        </button>
                      </td>
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