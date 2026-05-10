"use client";

import { useEffect, useMemo, useState } from "react";
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

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {certificates.map((certificate) => (
            <CertificateCard
              key={certificate.id}
              name={certificate.name}
              image={certificate.image || "/images/logo.png"}
              alt={certificate.alt || certificate.name}
            />
          ))}
        </div>
      </div>
    </section>
  );
}