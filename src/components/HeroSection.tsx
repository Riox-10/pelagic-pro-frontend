import Image from "next/image";
import Link from "next/link";
import { companyData } from "@/data/companyData";

export default function HeroSection() {
  return (
    <section className="relative min-h-[85vh] overflow-hidden">
      <Image
        src="/company/company-1-production-line.jpg"
        alt="Ligne de production Pelagic Pro"
        fill
        priority
        className="object-cover"
      />

      <div className="absolute inset-0 bg-slate-950/65" />

      <div className="relative z-10 mx-auto flex min-h-[85vh] max-w-7xl items-center px-4 py-24 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="mb-4 inline-flex rounded-full border border-sky-300/40 bg-sky-400/10 px-4 py-2 text-sm font-medium text-sky-100 backdrop-blur">
            Qualité · Sérieux · Produits de la mer
          </p>

          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Bienvenue chez {companyData.name}
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-200 sm:text-lg">
            {companyData.shortDescription}
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/produits"
              className="rounded-full bg-sky-500 px-7 py-3 text-center text-sm font-semibold text-white shadow-lg shadow-sky-900/30 transition hover:bg-sky-400"
            >
              Découvrir nos produits
            </Link>

            <Link
              href="/contact"
              className="rounded-full border border-white/50 bg-white/10 px-7 py-3 text-center text-sm font-semibold text-white backdrop-blur transition hover:bg-white hover:text-slate-900"
            >
              Nous contacter
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
