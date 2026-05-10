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
  alt?: string;
};

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  if (!product) {
    return null;
  }

  const productImage =
    product.image && product.image.trim() !== ""
      ? product.image
      : "/images/logo.png";

  return (
    <article className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div className="relative h-56 bg-gradient-to-br from-slate-50 to-sky-50 p-6">
        <Image
          src={productImage}
          alt={product.alt || product.name}
          fill
          className="object-contain p-6 transition duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>

      <div className="p-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-sky-50 px-3 py-1 text-xs font-bold text-sky-700">
            {product.brand}
          </span>

          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
            {product.category}
          </span>
        </div>

        <h3 className="mt-4 text-lg font-extrabold text-slate-900">
          {product.name}
        </h3>

        {product.description && (
          <p className="mt-3 text-sm leading-6 text-slate-600">
            {product.description}
          </p>
        )}

        <div className="mt-5 flex flex-wrap gap-2 text-xs font-semibold text-slate-600">
          {product.weight && (
            <span className="rounded-full border border-slate-200 px-3 py-1">
              {product.weight}
            </span>
          )}

          {product.packaging && (
            <span className="rounded-full border border-slate-200 px-3 py-1">
              {product.packaging}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}