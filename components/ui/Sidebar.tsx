"use client";

import ReactCountryFlag from "react-country-flag";
import { FiHome } from "react-icons/fi";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { name: "Home", icon: <FiHome />, country: null, path: "/" },
  { name: "Spanish", icon: null, country: "ES", path: "/spanish" },
  { name: "Japanese", icon: null, country: "JP", path: "/japanese" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-60 p-5">
      
      <h1 className="text-3xl font-semibold text-left tracking-wider text-white mb-10">
        Learn Lang
      </h1>

      <nav className="flex flex-col gap-2">
        {navItems.map((item) => {
          const isActive = pathname === item.path;

          return (
            <Link
              key={item.name}
              href={item.path}
              className={`flex items-center gap-3 px-6 py-3 rounded-lg tracking-wide text-md transition-all duration-200
                ${
                  isActive
                    ? "bg-[#191c20] text-white "
                    : "text-[#9FB0C3] hover:bg-[#191c20] hover:text-white"
                }`}
            >
              {item.icon && (
                <span className="text-[18px]">{item.icon}</span>
              )}

              {item.country && (
                <ReactCountryFlag
                  countryCode={item.country}
                  svg
                  style={{
                    width: "18px",
                    height: "18px",
                  }}
                />
              )}

              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}