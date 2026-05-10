"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { companyData } from "@/data/companyData";

const navLinks = [
  { label: "Accueil", href: "/" },
  { label: "Produits", href: "/produits" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <div className="relative h-12 w-12 overflow-hidden rounded-full bg-white shadow-sm">
            <Image
              src={companyData.logo}
              alt="Logo Pelagic Pro"
              fill
              className="object-contain p-1"
              priority
            />
          </div>

          <div>
            <p className="text-sm font-bold tracking-wide text-slate-900 sm:text-base">
              {companyData.name}
            </p>
            <p className="hidden text-xs text-slate-500 sm:block">
              Produits de la mer
            </p>
          </div>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-slate-700 transition hover:text-sky-600"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="inline-flex items-center justify-center rounded-lg border border-slate-200 p-2 text-slate-700 transition hover:bg-slate-100 md:hidden"
          aria-label="Ouvrir le menu"
        >
          <span className="text-2xl leading-none">{isOpen ? "×" : "☰"}</span>
        </button>
      </nav>

      {isOpen && (
        <div className="border-t border-slate-200 bg-white px-4 py-4 md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-sky-600"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
