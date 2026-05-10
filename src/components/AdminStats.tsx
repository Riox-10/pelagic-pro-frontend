type AdminStatsProps = {
  products: readonly unknown[];
  certificates: readonly unknown[];
  messages: readonly { email?: string }[];
};

export default function AdminStats({
  products,
  certificates,
  messages,
}: AdminStatsProps) {
  const uniqueEmails = new Set(
    messages
      .map((message) => message.email)
      .filter((email): email is string => Boolean(email))
  );

  const stats = [
    {
      label: "Produits",
      value: products.length,
      description: "Produits depuis Django",
    },
    {
      label: "Certifications",
      value: certificates.length,
      description: "Certificats depuis Django",
    },
    {
      label: "Messages",
      value: messages.length,
      description: "Messages contact reçus",
    },
    {
      label: "Emails",
      value: uniqueEmails.size,
      description: "Emails uniques",
    },
  ];

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
        >
          <p className="text-sm font-semibold text-slate-500">{stat.label}</p>

          <p className="mt-4 text-4xl font-extrabold text-slate-900">
            {stat.value}
          </p>

          <p className="mt-2 text-sm text-slate-500">{stat.description}</p>
        </div>
      ))}
    </div>
  );
}