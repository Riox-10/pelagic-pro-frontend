"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AdminHeader from "@/components/AdminHeader";
import AdminStats from "@/components/AdminStats";
import AdminProductForm from "@/components/AdminProductForm";
import AdminProductsTable from "@/components/AdminProductsTable";
import AdminMessages from "@/components/AdminMessages";
import AdminEmailsList from "@/components/AdminEmailsList";
import AdminCertificateForm from "@/components/AdminCertificateForm";
import AdminCertifications from "@/components/AdminCertifications";

type ContactMessage = {
  id: number;
  full_name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  is_read: boolean;
  created_at: string;
};

type Product = {
  id: number | string;
  name: string;
  brand: string;
  category: string;
  weight?: string;
  packaging?: string;
  description?: string;
  image?: string;
  is_active?: boolean;
  created_at?: string;
};

type Certificate = {
  id: number | string;
  name: string;
  image?: string;
  alt?: string;
  created_at?: string;
};

export default function AdminPage() {
  const router = useRouter();

  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);

  const [isChecking, setIsChecking] = useState(true);
  const [isLoadingData, setIsLoadingData] = useState(true);

  useEffect(() => {
    async function checkAdminAccess() {
      const token = localStorage.getItem("admin_token");

      if (!token) {
        router.replace("/admin/login");
        return;
      }

      try {
        const apiUrl =
          process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";

        const response = await fetch(`${apiUrl}/auth/me/`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });

        if (!response.ok) {
          localStorage.removeItem("admin_token");
          router.replace("/admin/login");
          return;
        }

        const user = await response.json();

        if (!user.is_staff) {
          localStorage.removeItem("admin_token");
          router.replace("/admin/login");
          return;
        }

        setIsChecking(false);
      } catch {
        localStorage.removeItem("admin_token");
        router.replace("/admin/login");
      }
    }

    checkAdminAccess();
  }, [router]);

  useEffect(() => {
    async function fetchAdminData() {
      const token = localStorage.getItem("admin_token");

      if (!token) {
        return;
      }

      try {
        const apiUrl =
          process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";

        const [messagesResponse, productsResponse, certificatesResponse] =
          await Promise.all([
            fetch(`${apiUrl}/contact-messages/`, {
              headers: {
                Authorization: `Token ${token}`,
              },
            }),
            fetch(`${apiUrl}/products/`),
            fetch(`${apiUrl}/certificates/`),
          ]);

        if (messagesResponse.status === 401 || messagesResponse.status === 403) {
          localStorage.removeItem("admin_token");
          router.replace("/admin/login");
          return;
        }

        const messagesData = messagesResponse.ok
          ? await messagesResponse.json()
          : [];

        const productsData = productsResponse.ok
          ? await productsResponse.json()
          : [];

        const certificatesData = certificatesResponse.ok
          ? await certificatesResponse.json()
          : [];

        setMessages(Array.isArray(messagesData) ? messagesData : []);
        setProducts(Array.isArray(productsData) ? productsData : []);
        setCertificates(
          Array.isArray(certificatesData) ? certificatesData : []
        );
      } catch {
        setMessages([]);
        setProducts([]);
        setCertificates([]);
      } finally {
        setIsLoadingData(false);
      }
    }

    if (!isChecking) {
      fetchAdminData();
    }
  }, [isChecking, router]);

  async function handleLogout() {
    const token = localStorage.getItem("admin_token");

    try {
      const apiUrl =
        process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";

      if (token) {
        await fetch(`${apiUrl}/auth/logout/`, {
          method: "POST",
          headers: {
            Authorization: `Token ${token}`,
          },
        });
      }
    } catch {
      // Même si logout API échoue, on supprime le token localement.
    }

    localStorage.removeItem("admin_token");
    router.replace("/admin/login");
  }

  if (isChecking) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
        Vérification de l’accès admin...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-6 flex justify-end">
          <button
            onClick={handleLogout}
            className="rounded-full bg-slate-950 px-5 py-2 text-sm font-bold text-white transition hover:bg-red-600"
          >
            Déconnexion
          </button>
        </div>

        <AdminHeader />

        <AdminStats
          products={products}
          certificates={certificates}
          messages={messages}
        />

        {isLoadingData ? (
          <div className="mt-10 rounded-3xl bg-white p-8 text-center text-slate-500 shadow-sm">
            Chargement des données...
          </div>
        ) : (
          <div className="mt-10 grid gap-8 xl:grid-cols-[1.4fr_0.9fr]">
            <div className="space-y-8">
              <AdminProductForm
                onProductCreated={(product: Product) => {
                  setProducts((currentProducts) => [
                    product,
                    ...currentProducts,
                  ]);
                }}
              />

              <AdminProductsTable
                products={products}
                onProductDeleted={(productId) => {
                  setProducts((currentProducts) =>
                    currentProducts.filter(
                      (product) => String(product.id) !== String(productId)
                    )
                  );
                }}
              />

              <AdminMessages messages={messages} />
            </div>

            <div className="space-y-8">
              <AdminEmailsList messages={messages} />

              <AdminCertificateForm
                onCertificateCreated={(certificate: Certificate) => {
                  setCertificates((currentCertificates) => [
                    certificate,
                    ...currentCertificates,
                  ]);
                }}
              />

              <AdminCertifications
                certificates={certificates}
                onCertificateDeleted={(certificateId) => {
                  setCertificates((currentCertificates) =>
                    currentCertificates.filter(
                      (certificate) =>
                        String(certificate.id) !== String(certificateId)
                    )
                  );
                }}
              />
            </div>
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}