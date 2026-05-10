export default function ProductsHero() {
  return (
    <section
      className="relative overflow-hidden bg-slate-950"
      style={{
        backgroundImage: "url('/images/produits-hero.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-slate-950/65" />

      <div className="relative mx-auto max-w-7xl px-4 py-28 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Nos Produits
          </h1>

          <p className="mt-6 text-lg leading-8 text-slate-200">
            Découvrez notre sélection de conserves de produits de la mer sous
            les marques PALMA et Lyra, avec plusieurs formats adaptés aux
            besoins des clients et partenaires professionnels.
          </p>
        </div>
      </div>
    </section>
  );
}