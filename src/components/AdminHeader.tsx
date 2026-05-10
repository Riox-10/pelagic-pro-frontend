export default function AdminHeader() {
  return (
    <section className="bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <p className="inline-flex rounded-full border border-sky-300/40 bg-sky-400/10 px-4 py-2 text-sm font-medium text-sky-100">
          Espace Administration
        </p>

        <h1 className="mt-6 text-4xl font-extrabold tracking-tight sm:text-5xl">
          Tableau de bord
        </h1>

        <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
          Gérez les produits, consultez les certifications et centralisez les
          messages envoyés par les visiteurs du site PELAGIC PRO.
        </p>
      </div>
    </section>
  );
}
