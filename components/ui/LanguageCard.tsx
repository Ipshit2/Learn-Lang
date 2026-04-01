import Link from "next/link";
import ReactCountryFlag from "react-country-flag";

type Props = {
  title: string;
  description: string;
  countryCode: string;
  href: string;
  color: string;
};

export default function LanguageCard({
  title,
  description,
  countryCode,
  href,
  color,
}: Props) {
  return (
    <div className="bg-[#191c20] rounded-3xl p-8 w-full h-full flex flex-col justify-between border border-[#272a2f]">
        <div className="flex items-center gap-3">
            <ReactCountryFlag
            countryCode={countryCode}
            svg
            style={{
                width: "70px",
                height: "70px",
                borderRadius: "3px",
            }}/>
            <div>
                <h2 className="text-lg tracking-wide font-medium text-white">
                    {title}
                </h2>
                <p className="text-sm text-[#9FB0C3]">
                    {description}
                </p>
            </div>
        </div>
        <Link href={href}>
            <button className="mt-6 text-md px-4 py-2 rounded-lg w-full cursor-pointer font-medium"
            style={{ backgroundColor: color, color: "#ffffff" }}>
                Start {title} <span className="pl-3">&rarr;</span> 
            </button>
        </Link>
    </div>
  )
}