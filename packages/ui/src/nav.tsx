import Link from "next/link";
import { PropsWithChildren } from "react";

type NavbarItemProps = {
  link: string;
  label: string;
  active: boolean;
};

export const URLNavbar = ({ children }: PropsWithChildren) => {
  return (
    <div className="relative text-center w-full p-2 rounded-xl bg-callout border border-callout-border max-w-max mx-auto md:mx-0 gap-3 font-mono">
      {children}
    </div>
  );
};

export const NavbarItem = ({ active, label, link }: NavbarItemProps) => {
  return (
    <Link href={link}>
      <button
        className={`h-8 px-3 rounded-lg ${active ? "bg-white text-black" : "text-white"}`}
      >
        {label}
      </button>
    </Link>
  );
};
