"use client";

import Image from "next/image";

type Certificate = {
  id: number | string;
  name: string;
  image?: string;
  alt?: string;
  created_at?: string;
};

type AdminCertificationsProps = {
  certificates: readonly Certificate[];
  onCertificateDeleted: (certificateId: number | string) => void;
};

export default function AdminCertifications({
  certificates,
  onCertificateDeleted,
}: AdminCertificationsProps) {
  async function handleDelete(certificateId: number | string) {
    const confirmDelete = window.confirm(
      "Voulez-vous vraiment supprimer ce certificat ?"
    );

    if (!confirmDelete) {
      return;
    }

    const token = localStorage.getItem("admin_token");

    if (!token) {
      alert("Session admin introuvable. Reconnectez-vous.");
      return;
    }

    try {
      const apiUrl =
        process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";

      const response = await fetch(
        `${apiUrl}/certificates/${certificateId}/delete/`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      if (!response.ok) {
        alert("Impossible de supprimer ce certificat.");
        return;
      }

      onCertificateDeleted(certificateId);
    } catch {
      alert("Erreur serveur lors de la suppression.");
    }
  }

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-600">
          Certifications
        </p>

        <h2 className="mt-2 text-2xl font-bold text-slate-900">
          Certificats enregistrés
        </h2>

        <p className="mt-3 text-sm text-slate-500">
          Liste des certificats récupérés depuis Django.
        </p>
      </div>

      <div className="mt-6 space-y-3">
        {certificates.length === 0 ? (
          <div className="rounded-2xl bg-slate-50 px-4 py-5 text-sm text-slate-500">
            Aucun certificat enregistré dans Django pour le moment.
          </div>
        ) : (
          certificates.map((certificate) => {
            const certificateImage =
              certificate.image && certificate.image.trim() !== ""
                ? certificate.image
                : "/images/logo.png";

            return (
              <div
                key={certificate.id}
                className="flex items-center justify-between gap-4 rounded-2xl border border-slate-100 bg-slate-50 p-4"
              >
                <div className="flex items-center gap-4">
                  <div className="relative h-16 w-24 shrink-0 rounded-xl bg-white">
                    <Image
                      src={certificateImage}
                      alt={certificate.alt || certificate.name}
                      fill
                      className="object-contain p-2"
                      sizes="96px"
                    />
                  </div>

                  <div>
                    <p className="text-sm font-bold text-slate-900">
                      {certificate.name}
                    </p>

                    {certificate.created_at && (
                      <p className="mt-1 text-xs text-slate-500">
                        Ajouté le{" "}
                        {new Date(certificate.created_at).toLocaleDateString(
                          "fr-FR"
                        )}
                      </p>
                    )}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleDelete(certificate.id)}
                  className="rounded-full bg-red-50 px-4 py-2 text-xs font-bold text-red-700 transition hover:bg-red-600 hover:text-white"
                >
                  Supprimer
                </button>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}