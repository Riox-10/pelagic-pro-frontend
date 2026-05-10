"use client";

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

type AdminEmailsListProps = {
  messages: readonly ContactMessage[];
};

export default function AdminEmailsList({ messages }: AdminEmailsListProps) {
  const uniqueEmails = Array.from(
    new Set(messages.map((message) => message.email))
  );

  async function copyEmails() {
    await navigator.clipboard.writeText(uniqueEmails.join(", "));
    alert("Emails copiés avec succès.");
  }

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-600">
            Emails utilisateurs
          </p>

          <h2 className="mt-2 text-2xl font-bold text-slate-900">
            Liste des emails
          </h2>
        </div>

        <button
          onClick={copyEmails}
          disabled={uniqueEmails.length === 0}
          className="rounded-full bg-slate-950 px-5 py-2 text-sm font-semibold text-white transition hover:bg-sky-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Copier tous
        </button>
      </div>

      <div className="mt-6 space-y-3">
        {uniqueEmails.length === 0 ? (
          <div className="rounded-2xl bg-slate-50 px-4 py-5 text-sm text-slate-500">
            Aucun email disponible.
          </div>
        ) : (
          uniqueEmails.map((email) => (
            <div
              key={email}
              className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700"
            >
              {email}
            </div>
          ))
        )}
      </div>
    </section>
  );
}