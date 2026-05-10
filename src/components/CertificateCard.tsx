import Image from "next/image";

type CertificateCardProps = {
  name: string;
  image: string;
  alt: string;
};

export default function CertificateCard({
  name,
  image,
  alt,
}: CertificateCardProps) {
  return (
    <div className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="relative mx-auto h-32 w-full">
        <Image
          src={image}
          alt={alt}
          fill
          className="object-contain transition duration-300 group-hover:scale-105"
        />
      </div>

      <h3 className="mt-6 text-center text-sm font-semibold text-slate-800">
        {name}
      </h3>
    </div>
  );
}
