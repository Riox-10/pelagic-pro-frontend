import Image from "next/image";
import Link from "next/link";
import { companyData } from "@/data/companyData";

export default function ContactHero() {
  return (
    <section className="relative overflow-hidden bg-slate-950">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(14,165,233,0.28),_transparent_34%),linear-gradient(135deg,_#020617,_#082f49_55%,_#0f172a)]" />
      <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-sky-400/20 blur-3xl" />
      <div className="absolute -bottom-32 left-10 h-72 w-72 rounded-full bg-cyan-300/10 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-24 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-28">
        <div>
      
          <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Contactez PELAGIC PRO
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200">
            Notre équipe reste à votre disposition pour toute demande
            d’information, collaboration professionnelle ou question liée à nos
            produits de la mer.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a
              href={`mailto:${companyData.email}`}
              className="rounded-full bg-sky-500 px-7 py-3 text-center text-sm font-semibold text-white shadow-lg shadow-sky-900/30 transition hover:bg-sky-400"
            >
              Envoyer un email
            </a>

            <Link
              href="/produits"
              className="rounded-full border border-white/40 bg-white/10 px-7 py-3 text-center text-sm font-semibold text-white backdrop-blur transition hover:bg-white hover:text-slate-900"
            >
              Voir nos produits
            </Link>
          </div>
        </div>

        <div className="flex justify-center lg:justify-end">
          <div className="rounded-[2rem] border border-white/15 bg-white/10 p-8 shadow-2xl backdrop-blur">
            <div className="relative mx-auto h-40 w-40 overflow-hidden rounded-full bg-white shadow-xl sm:h-48 sm:w-48">
              <Image
                src={companyData.logo}
                alt="Logo Pelagic Pro"
                fill
                priority
                className="object-contain p-4"
              />
            </div>

            <div className="mt-6 text-center">
              <h2 className="text-2xl font-bold text-white">
                {companyData.name}
              </h2>
              <p className="mt-2 text-sm text-slate-300">
                Produits de la mer · Dakhla
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
