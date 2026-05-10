export type ContactMessage = {
  id: number;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  date: string;
  status: "Nouveau" | "Lu" | "Traité";
};

export const contactMessagesData: ContactMessage[] = [
  {
    id: 1,
    name: "Client Exemple",
    email: "client.exemple@email.com",
    phone: "06 00 00 00 00",
    subject: "Demande de catalogue",
    message:
      "Bonjour, je souhaite recevoir plus d’informations concernant vos produits PALMA et Lyra.",
    date: "09/05/2026",
    status: "Nouveau",
  },
  {
    id: 2,
    name: "Partenaire Export",
    email: "export.partner@email.com",
    phone: "06 11 22 33 44",
    subject: "Demande de partenariat",
    message:
      "Nous sommes intéressés par une collaboration commerciale concernant les conserves de produits de la mer.",
    date: "09/05/2026",
    status: "Lu",
  },
  {
    id: 3,
    name: "Acheteur Professionnel",
    email: "achat.pro@email.com",
    phone: "06 55 66 77 88",
    subject: "Informations sur les formats",
    message:
      "Merci de nous communiquer les formats disponibles et les conditions de commande pour les produits sardines et maquereaux.",
    date: "08/05/2026",
    status: "Traité",
  },
];
