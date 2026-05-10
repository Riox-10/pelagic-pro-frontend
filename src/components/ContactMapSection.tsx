import { companyData } from "@/data/companyData";

export default function ContactMapSection() {
  return (
    <section className="bg-slate-50 px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm lg:grid-cols-2">
        <div className="bg-slate-950 p-8 text-white sm:p-12">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-sky-300">
            Localisation
          </p>

          <h2 className="mt-6 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Zone Industrielle du Port de Dakhla
          </h2>

          <p className="mt-8 text-base leading-8 text-slate-200">
            {companyData.address}. Une implantation stratégique à Dakhla, au
            service des produits de la mer et des partenaires professionnels.
          </p>

          <div className="mt-8 space-y-4 text-sm text-slate-200">
            <p>
              <strong className="text-white">Code postal :</strong>{" "}
              {companyData.postalCode}
            </p>
            <p>
              <strong className="text-white">Région :</strong>{" "}
              {companyData.region}
            </p>
            <p>
              <strong className="text-white">Agrément sanitaire :</strong>{" "}
              {companyData.sanitaryApproval}
            </p>
          </div>
        </div>

        <div className="flex min-h-[430px] items-center justify-center bg-sky-50 p-8">
          <div className="w-full max-w-xl rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-md">
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-sky-100 text-3xl text-sky-700">
              ⊕
            </div>

            <h3 className="mt-8 text-2xl font-bold tracking-wide text-slate-900">
              PELAGIC PRO
            </h3>

            <p className="mt-4 text-slate-600">
              Dakhla Port Industrial Zone - Dakhla - Morocco
            </p>

            <a
              href="https://maps.app.goo.gl/BCq3KUxsjYdYQB4B6"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex rounded-full bg-slate-950 px-7 py-3 text-sm font-semibold text-white transition hover:bg-sky-600"
            >
              Ouvrir dans Google Maps
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}