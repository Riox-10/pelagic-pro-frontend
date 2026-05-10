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

type AdminMessagesProps = {
  messages: readonly ContactMessage[];
};

export default function AdminMessages({ messages }: AdminMessagesProps) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-600">
          Messages contact
        </p>

        <h2 className="mt-2 text-2xl font-bold text-slate-900">
          Messages reçus
        </h2>

        <p className="mt-3 text-sm text-slate-500">
          Liste des messages envoyés depuis le formulaire de contact.
        </p>
      </div>

      <div className="mt-6 space-y-4">
        {messages.length === 0 ? (
          <div className="rounded-2xl bg-slate-50 px-4 py-5 text-sm text-slate-500">
            Aucun message reçu pour le moment.
          </div>
        ) : (
          messages.map((message) => (
            <article
              key={message.id}
              className="rounded-2xl border border-slate-100 bg-slate-50 p-4"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    {message.full_name}
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    {message.email}
                    {message.phone ? ` · ${message.phone}` : ""}
                  </p>
                </div>

                <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-500">
                  {new Date(message.created_at).toLocaleDateString("fr-FR")}
                </span>
              </div>

              <div className="mt-4">
                <p className="text-sm font-semibold text-slate-800">
                  Sujet : {message.subject}
                </p>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {message.message}
                </p>
              </div>
            </article>
          ))
        )}
      </div>
    </section>
  );
}