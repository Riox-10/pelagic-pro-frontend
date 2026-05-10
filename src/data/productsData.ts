export type Product = {
  id: number;
  name: string;
  brand: "PALMA" | "Lyra";
  category: "Sardines" | "Maquereaux" | "Bonites";
  image: string;
  alt: string;
  weight: string;
  packing: string;
  origin: string;
  description: string;
};

export const productsData: Product[] = [
  {
    id: 1,
    name: "Sardines à l’huile Végétale",
    brand: "PALMA",
    category: "Sardines",
    image: "/products/palma-sardines-huile-vegetale.png",
    alt: "Sardines PALMA à l’huile végétale 125g",
    weight: "125g",
    packing: "x 50",
    origin: "Dakhla - Maroc",
    description:
      "Sardines préparées à l’huile végétale, conditionnées dans un format pratique adapté à la distribution professionnelle.",
  },
  {
    id: 2,
    name: "Sardines à l’huile Végétale Pimentée",
    brand: "PALMA",
    category: "Sardines",
    image: "/products/palma-sardines-huile-vegetale-pimentee.png",
    alt: "Sardines PALMA à l’huile végétale pimentée 125g",
    weight: "125g",
    packing: "x 50",
    origin: "Dakhla - Maroc",
    description:
      "Une version pimentée des sardines à l’huile végétale, pensée pour les clients qui recherchent un goût plus relevé.",
  },
  {
    id: 3,
    name: "Sardines à la Sauce Tomate",
    brand: "PALMA",
    category: "Sardines",
    image: "/products/palma-sardines-sauce-tomate.png",
    alt: "Sardines PALMA à la sauce tomate 125g",
    weight: "125g",
    packing: "x 50",
    origin: "Dakhla - Maroc",
    description:
      "Sardines en sauce tomate, une référence classique pour les marchés de conserve et la grande distribution.",
  },
  {
    id: 4,
    name: "Sardines à l’huile de Tournesol",
    brand: "PALMA",
    category: "Sardines",
    image: "/products/palma-sardines-huile-tournesol.png",
    alt: "Sardines PALMA à l’huile de tournesol 125g",
    weight: "125g",
    packing: "x 50",
    origin: "Dakhla - Maroc",
    description:
      "Sardines à l’huile de tournesol, préparées pour offrir une présentation propre et une qualité régulière.",
  },
  {
    id: 5,
    name: "Morceaux de Maquereaux à l’huile Végétale",
    brand: "PALMA",
    category: "Maquereaux",
    image: "/products/palma-maquereaux-huile-vegetale.png",
    alt: "Morceaux de maquereaux PALMA à l’huile végétale 125g",
    weight: "125g",
    packing: "x 50",
    origin: "Dakhla - Maroc",
    description:
      "Morceaux de maquereaux à l’huile végétale, conditionnés en boîte pour un usage commercial fiable.",
  },
  {
    id: 6,
    name: "Filets de Maquereaux au Naturel Avec Citron",
    brand: "PALMA",
    category: "Maquereaux",
    image: "/products/palma-filets-maquereaux-naturel-citron.png",
    alt: "Filets de maquereaux PALMA au naturel avec citron 125g",
    weight: "125g",
    packing: "x 50",
    origin: "Dakhla - Maroc",
    description:
      "Filets de maquereaux au naturel avec citron, une préparation fraîche et équilibrée pour les amateurs de poisson.",
  },
  {
    id: 7,
    name: "Filets de Maquereaux à l’huile de Tournesol",
    brand: "PALMA",
    category: "Maquereaux",
    image: "/products/palma-filets-maquereaux-huile-tournesol.png",
    alt: "Filets de maquereaux PALMA à l’huile de tournesol 125g",
    weight: "125g",
    packing: "x 50",
    origin: "Dakhla - Maroc",
    description:
      "Filets de maquereaux à l’huile de tournesol, proposés dans un format standard adapté à la vente en gros.",
  },
  {
    id: 8,
    name: "Morceaux de Maquereaux à la Sauce Tomate",
    brand: "PALMA",
    category: "Maquereaux",
    image: "/products/palma-maquereaux-sauce-tomate-80g.png",
    alt: "Morceaux de maquereaux PALMA à la sauce tomate 80g",
    weight: "80g",
    packing: "x 25",
    origin: "Dakhla - Maroc",
    description:
      "Morceaux de maquereaux à la sauce tomate en petit format, pratique pour une consommation individuelle.",
  },
  {
    id: 9,
    name: "Morceaux de Maquereaux à la Sauce Tomate",
    brand: "PALMA",
    category: "Maquereaux",
    image: "/products/palma-maquereaux-sauce-tomate-425g.png",
    alt: "Morceaux de maquereaux PALMA à la sauce tomate 425g",
    weight: "425g",
    packing: "x 12",
    origin: "Dakhla - Maroc",
    description:
      "Format familial de morceaux de maquereaux à la sauce tomate, adapté aux besoins des professionnels et revendeurs.",
  },
  {
    id: 10,
    name: "Filets de Bonite à l’huile Végétale",
    brand: "PALMA",
    category: "Bonites",
    image: "/products/palma-bonite-huile-vegetale.png",
    alt: "Filets de bonite PALMA à l’huile végétale 1700g",
    weight: "1700g / 1,7kg",
    packing: "x 2",
    origin: "Dakhla - Maroc",
    description:
      "Filets de bonite à l’huile végétale en grand format, conçus pour les besoins de restauration et distribution.",
  },
  {
    id: 11,
    name: "Emiettés de Sardines à la Sauce Tomate Piquante",
    brand: "Lyra",
    category: "Sardines",
    image: "/products/lyra-emiettes-sardines-sauce-tomate-piquante.png",
    alt: "Émiettés de sardines Lyra à la sauce tomate piquante 125g",
    weight: "125g",
    packing: "x 50",
    origin: "Dakhla - Maroc",
    description:
      "Émiettés de sardines à la sauce tomate piquante, une référence Lyra au goût relevé et pratique.",
  },
  {
    id: 12,
    name: "Morcelets de Maquereaux à la Sauce Sevillana Piquante",
    brand: "Lyra",
    category: "Maquereaux",
    image: "/products/lyra-maquereaux-sevillana-piquante.png",
    alt: "Morcelets de maquereaux Lyra à la sauce Sevillana piquante 125g",
    weight: "125g",
    packing: "x 50",
    origin: "Dakhla - Maroc",
    description:
      "Morcelets de maquereaux à la sauce Sevillana piquante, préparés pour une saveur plus marquée.",
  },
  {
    id: 13,
    name: "Morcelets de Maquereaux à la Sauce Tomate aux légumes et aux Épices",
    brand: "Lyra",
    category: "Maquereaux",
    image: "/products/lyra-maquereaux-sauce-tomate-legumes-epices.png",
    alt: "Morcelets de maquereaux Lyra à la sauce tomate aux légumes et aux épices 125g",
    weight: "125g",
    packing: "x 50",
    origin: "Dakhla - Maroc",
    description:
      "Morcelets de maquereaux en sauce tomate avec légumes et épices, une préparation riche et distinctive.",
  },
  {
    id: 14,
    name: "Filets de Maquereaux à l’huile Végétale",
    brand: "Lyra",
    category: "Maquereaux",
    image: "/products/lyra-filets-maquereaux-huile-vegetale.png",
    alt: "Filets de maquereaux Lyra à l’huile végétale 125g",
    weight: "125g",
    packing: "x 50",
    origin: "Dakhla - Maroc",
    description:
      "Filets de maquereaux Lyra à l’huile végétale, conditionnés dans un format professionnel standard.",
  },
];
