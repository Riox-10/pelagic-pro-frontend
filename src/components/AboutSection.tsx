import Image from "next/image";
import { companyData } from "@/data/companyData";

export default function AboutSection() {
  return (
    <section className="bg-slate-50 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-sky-600">
              About Us
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Présentation de la société
            </h2>

            <p className="mt-6 text-base leading-8 text-slate-600">
              {companyData.aboutText}
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {companyData.advantages.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  <h3 className="text-lg font-bold text-slate-900">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {companyData.companyImages.map((image, index) => (
              <div
                key={image.src}
                className={`relative overflow-hidden rounded-3xl bg-slate-200 shadow-md ${
                  index === 0 || index === 3 ? "h-72" : "h-56"
                }`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition duration-500 hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 rounded-3xl bg-slate-900 p-8 text-white shadow-xl sm:p-10">
          <h3 className="text-2xl font-bold">Pourquoi choisir Pelagic Pro ?</h3>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {companyData.advantages.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-white/10 bg-white/5 p-5"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-sky-500 text-lg font-bold">
                  ✓
                </div>
                <h4 className="font-semibold text-white">{item.title}</h4>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
