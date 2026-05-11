"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import CertificateCard from "@/components/CertificateCard";
import { certificatesData } from "@/data/certificatesData";

type Certificate = {
  id: number | string;
  name: string;
  image: string;
  alt?: string;
  created_at?: string;
};

export default function CertificationsSection() {
  const sliderRef = useRef<HTMLDivElement | null>(null);

  const [djangoCertificates, setDjangoCertificates] = useState<Certificate[]>(
    []
  );

  useEffect(() => {
    async function fetchCertificates() {
      try {
        const apiUrl =
          process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";

        const response = await fetch(`${apiUrl}/certificates/`);

        if (!response.ok) {
          return;
        }

        const data = await response.json();

        if (Array.isArray(data)) {
          setDjangoCertificates(
            data.map((certificate) => ({
              ...certificate,
              id: `db-${certificate.id}`,
              image: certificate.image || "/images/logo.png",
              alt: certificate.alt || certificate.name,
            }))
          );
        }
      } catch {
        setDjangoCertificates([]);
      }
    }

    fetchCertificates();
  }, []);

  const certificates = useMemo(() => {
    const localCertificates = certificatesData.map((certificate) => ({
      ...certificate,
      id: `local-${certificate.id}`,
    }));

    const allCertificates = [...localCertificates, ...djangoCertificates];

    const uniqueCertificates = allCertificates.filter(
      (certificate, index, array) =>
        index ===
        array.findIndex(
          (item) =>
            item.name.toLowerCase().trim() ===
            certificate.name.toLowerCase().trim()
        )
    );

    return uniqueCertificates;
  }, [djangoCertificates]);

  function scrollCertificates(direction: "left" | "right") {
    if (!sliderRef.current) {
      return;
    }

    sliderRef.current.scrollBy({
      left: direction === "left" ? -350 : 350,
      behavior: "smooth",
    });
  }

  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-sky-600">
            Certifications
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Nos Certifications
          </h2>

          <p className="mt-5 text-base leading-8 text-slate-600">
            Découvrez les certifications et agréments qui reflètent
            l’engagement de PELAGIC PRO envers la qualité, la sécurité
            alimentaire et les normes professionnelles.
          </p>
        </div>

        <div className="mt-12 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
              Faites défiler
            </p>
            <h3 className="mt-2 text-xl font-bold text-slate-900">
              Plus de certificats disponibles
            </h3>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => scrollCertificates("left")}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-xl font-bold text-slate-700 shadow-sm transition hover:border-sky-500 hover:bg-sky-50 hover:text-sky-600"
              aria-label="Voir les certificats précédents"
            >
              ‹
            </button>

            <button
              type="button"
              onClick={() => scrollCertificates("right")}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-xl font-bold text-slate-700 shadow-sm transition hover:border-sky-500 hover:bg-sky-50 hover:text-sky-600"
              aria-label="Voir les certificats suivants"
            >
              ›
            </button>
          </div>
        </div>

        <div
          ref={sliderRef}
          className="mt-8 flex gap-6 overflow-x-auto scroll-smooth pb-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {certificates.map((certificate) => (
            <div
              key={certificate.id}
              className="min-w-[260px] max-w-[260px] sm:min-w-[300px] sm:max-w-[300px]"
            >
              <CertificateCard
                name={certificate.name}
                image={certificate.image || "/images/logo.png"}
                alt={certificate.alt || certificate.name}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}