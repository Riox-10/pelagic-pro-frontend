import { companyData } from "@/data/companyData";

const contactItems = [
  {
    title: "Email",
    value: companyData.email,
    href: `mailto:${companyData.email}`,
    icon: "✉",
  },
  {
    title: "Téléphone",
    value: companyData.phone,
    href: `tel:${companyData.phone}`,
    icon: "☎",
  },
  {
    title: "Adresse",
    value: companyData.address,
    href: undefined,
    icon: "⌖",
  },
  {
    title: "Agrément sanitaire",
    value: companyData.sanitaryApproval,
    href: undefined,
    icon: "✓",
  },
];

export default function ContactInfo() {
  return (
    <section className="bg-slate-50 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-sky-600">
            Informations
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Nos coordonnées
          </h2>

          <p className="mt-5 text-base leading-8 text-slate-600">
            Retrouvez les informations principales de PELAGIC PRO pour nous
            contacter rapidement.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {contactItems.map((item) => (
            <div
              key={item.title}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-100 text-xl text-sky-700">
                {item.icon}
              </div>

              <h3 className="mt-5 text-lg font-bold text-slate-900">
                {item.title}
              </h3>

              {item.href ? (
                <a
                  href={item.href}
                  className="mt-3 block text-sm leading-6 text-slate-600 transition hover:text-sky-600"
                >
                  {item.value}
                </a>
              ) : (
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {item.value}
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <p className="text-sm font-semibold text-slate-500">Code postal</p>
              <p className="mt-2 font-bold text-slate-900">
                {companyData.postalCode}
              </p>
            </div>

            <div>
              <p className="text-sm font-semibold text-slate-500">Région</p>
              <p className="mt-2 font-bold text-slate-900">
                {companyData.region}
              </p>
            </div>

            <div>
              <p className="text-sm font-semibold text-slate-500">
                Adresse en anglais
              </p>
              <p className="mt-2 font-bold text-slate-900">
                {companyData.addressEnglish}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
