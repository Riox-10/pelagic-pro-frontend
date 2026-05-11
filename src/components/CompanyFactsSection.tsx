const companyFacts = [
  {
    label: "Année de création",
    value: "2015",
    description: "Une société marocaine spécialisée dans la valorisation des produits de la mer.",
  },
  {
    label: "Localisation",
    value: "Dakhla, Maroc",
    description: "Une implantation stratégique dans la zone industrielle du port de Dakhla.",
  },
  {
    label: "Activité principale",
    value: "Conserves de poisson",
    description: "Production de conserves de sardines, maquereaux, bonites et autres produits de la mer.",
  },
  {
    label: "Effectif",
    value: "+700",
    description: "Une équipe importante contribuant au développement et à la production de l’entreprise.",
  },
  {
    label: "Production",
    value: "Local & Export",
    description: "Des produits destinés au marché national ainsi qu’aux marchés internationaux.",
  },
  {
    label: "Qualité",
    value: "Normes certifiées",
    description: "Un engagement continu envers la qualité, l’hygiène et la sécurité alimentaire.",
  },
];

export default function CompanyFactsSection() {
  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.4fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-sky-600">
              Fiche technique
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Informations clés sur PELAGIC PRO
            </h2>

            <p className="mt-5 text-base leading-8 text-slate-600">
              PELAGIC PRO est une société marocaine opérant dans le secteur des
              produits de la mer. Grâce à son savoir-faire industriel et à son
              engagement envers la qualité, elle contribue à la valorisation des
              ressources halieutiques dans la région de Dakhla.
            </p>

            <div className="mt-8 rounded-3xl bg-slate-950 p-6 text-white shadow-xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-300">
                Domaine d’activité
              </p>

              <p className="mt-3 text-lg font-bold">
                Transformation et conservation des produits de la mer
              </p>

              <p className="mt-3 text-sm leading-7 text-slate-300">
                La société intervient principalement dans la fabrication des
                conserves de poisson ainsi que dans la valorisation des
                sous-produits issus de l’activité halieutique.
              </p>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {companyFacts.map((fact) => (
              <article
                key={fact.label}
                className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm transition hover:-translate-y-1 hover:bg-white hover:shadow-xl"
              >
                <p className="text-sm font-semibold text-sky-600">
                  {fact.label}
                </p>

                <h3 className="mt-3 text-2xl font-bold text-slate-900">
                  {fact.value}
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {fact.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}