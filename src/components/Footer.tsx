"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { companyData } from "@/data/companyData";
import { certificatesData } from "@/data/certificatesData";

const footerLinks = [
  { label: "Accueil", href: "/" },
  { label: "Produits", href: "/produits" },
  { label: "Contact", href: "/contact" },
];

type Certificate = {
  id: number | string;
  name: string;
  image: string;
  alt?: string;
  created_at?: string;
};

export default function Footer() {
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
    <footer className="bg-slate-950 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div>
          <div className="flex items-center gap-3">
            <div className="relative h-14 w-14 overflow-hidden rounded-full bg-white">
              <Image
                src={companyData.logo}
                alt="Logo Pelagic Pro"
                fill
                className="object-contain p-1"
              />
            </div>

            <div>
              <h3 className="font-bold">{companyData.name}</h3>
              <p className="text-xs text-slate-400">Dakhla · Maroc</p>
            </div>
          </div>

          <p className="mt-5 text-sm leading-7 text-slate-300">
            {companyData.description}
          </p>
        </div>

        <div>
          <h3 className="text-lg font-bold">Liens rapides</h3>

          <ul className="mt-5 space-y-3">
            {footerLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-slate-300 transition hover:text-sky-400"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-bold">Contact</h3>

          <ul className="mt-5 space-y-3 text-sm text-slate-300">
            <li>
              Email:{" "}
              <a
                href={`mailto:${companyData.email}`}
                className="transition hover:text-sky-400"
              >
                {companyData.email}
              </a>
            </li>
            <li>
              Téléphone:{" "}
              <a
                href={`tel:${companyData.phone}`}
                className="transition hover:text-sky-400"
              >
                {companyData.phone}
              </a>
            </li>
            <li>Adresse: {companyData.address}</li>
            <li>Code postal: {companyData.postalCode}</li>
            <li>Région: {companyData.region}</li>
            <li>Agrément sanitaire: {companyData.sanitaryApproval}</li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-bold">Certifications</h3>

          <div className="mt-5 grid grid-cols-3 gap-3">
            {certificates.map((certificate) => (
              <div
                key={certificate.id}
                className="relative h-16 rounded-xl bg-white p-2"
                title={certificate.name}
              >
                <Image
                  src={certificate.image || "/images/logo.png"}
                  alt={certificate.alt || certificate.name}
                  fill
                  className="object-contain p-2"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-5">
        <p className="text-center text-sm text-slate-400">
          © 2026 PELAGIC PRO. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
}