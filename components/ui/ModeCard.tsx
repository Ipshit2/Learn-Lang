import Link from "next/link";

type Props = {
  title: string;
  example: string;
  description: string;
  href: string;
};

export default function ModeCard({
  title,
  example,
  description,
  href,
}: Props) {
  return (
    <Link
      href={href}
      className="bg-[#191c20] hover:bg-[#1d2025] transition-all duration-200 rounded-xl p-6 w-full h-full flex flex-col justify-between border border-[#2a2f36] cursor-pointer font-Inter">
      <div>
        <h2 className="text-xl font-medium text-white mb-2">
          {title}
        </h2>

        <p className="text-md text-[#9FB0C3] mb-2">
          {example}
        </p>

        <p className="text-sm text-[#6B7C93]">
          {description}
        </p>
      </div>

      <button className="mt-6 text-md px-8 py-2 rounded-md w-fit font-medium bg-[#2ccd67] text-black">
        Start
      </button>
    </Link>
  );
}