import Link from "next/link";

type Props = {
  title: string;
  example: string;
  description: string;
  href: string;
  active: boolean;
};

export default function ModeCard({
  title,
  example,
  description,
  href,
  active,
}: Props) {
  return (
    <Link
      href={active ? href : "#"}
      onClick={(e) => {
        if (!active) e.preventDefault();
      }}
      className={`rounded-xl p-6 w-full h-full flex flex-col justify-between border font-Inter transition-all duration-200 ${active
            ? "bg-[#191c20] hover:bg-[#1d2025] border-[#2a2f36] hover:scale-[1.02]"
            : "bg-[#2a2f36] border-[#2a2f36] cursor-not-allowed opacity-60 grayscale"
        }`}>
      <div>
        <h2 className={`text-xl font-medium mb-2 ${
            active ? "text-white" : "text-gray-400"
          }`}>
          {title}
        </h2>

        <p className={`text-md mb-2 ${
            active ? "text-[#9FB0C3]" : "text-gray-500"
          }`}>
          {example}
        </p>

        <p className={`text-sm ${
            active ? "text-[#6B7C93]" : "text-gray-600"
          }`}>
          {description}
        </p>
      </div>

      <button
        className={`mt-6 text-md px-8 py-2 rounded-md w-fit font-medium transition-all duration-200
          ${
            active
              ? "bg-[#2ccd67] text-black hover:scale-105 cursor-pointer"
              : "bg-[#3a3d40] text-gray-500 cursor-not-allowed"
          }`}
      >
        {active ? "Start" : "Locked"}
      </button>
    </Link>
  );
}