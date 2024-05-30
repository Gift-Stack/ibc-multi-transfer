/* eslint-disable @next/next/no-img-element */
import { Card } from "@milkyway-engine/ui/card";
import { Suspense } from "react";
import styles from "./page.module.css";
import Navbar from "./_components/nav";
import TransactionList from "./_components/transactions.tsx";
import MakePayments from "./_components/make-payments";
import { NavbarItem, TxNavbarItem } from "./_types";

function Gradient({
  conic,
  className,
  small,
}: {
  small?: boolean;
  conic?: boolean;
  className?: string;
}): JSX.Element {
  return (
    <span
      className={[
        styles.gradient,
        conic ? styles.glowConic : undefined,
        small ? styles.gradientSmall : styles.gradientLarge,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    />
  );
}

const LINKS = [
  {
    title: "Docs",
    href: "https://turbo.build/repo/docs",
    description: "Find in-depth information about Turborepo features and API.",
  },
  {
    title: "Learn",
    href: "https://turbo.build/repo/docs/handbook",
    description: "Learn more about monorepos with our handbook.",
  },
  {
    title: "Templates",
    href: "https://turbo.build/repo/docs/getting-started/from-example",
    description: "Choose from over 15 examples and deploy with a single click.",
  },
  {
    title: "Deploy",
    href: "https://vercel.com/new",
    description:
      "Instantly deploy your Turborepo to a shareable URL with Vercel.",
  },
];

export default function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}): JSX.Element {
  const activeTab =
    (searchParams["active-tab"] as NavbarItem) || "make-payments";

  const activeTx = (searchParams["tx"] as TxNavbarItem) || "single-tx";

  return (
    <main className="relative flex flex-col items-center justify-between- min-h-screen p-5 md:p-24">
      <Suspense fallback={<div>Loading...</div>}>
        <Navbar />
      </Suspense>

      <div className="flex fixed top-[50%] translate-y-[-50%] place-items-center-">
        {/* <div className={styles.heroContent}> */}
        <div className="">
          <div className="flex z-50 items-center justify-center w-full">
            <div className="absolute pointer-events-none min-w-[307px] md:min-w-[614px] min-h-[307px] md:min-h-[614px]">
              <img
                alt=""
                src="circles.svg"
                className="h-[307px] md:h-[614px] w-[307px] md:w-[614px] pointer-events-none"
              />
            </div>
          </div>

          <Gradient className={styles.backgroundGradient} conic />
        </div>
      </div>

      <div className="pt-8 md:pt-16 w-full max-w-[1100px]">
        {activeTab === "transactions" && <TransactionList />}
        {activeTab === "make-payments" && <MakePayments activeTx={activeTx} />}
      </div>

      {/* <div className={styles.grid}>
        {LINKS.map(({ title, href, description }) => (
          <Card className={styles.card} href={href} key={title} title={title}>
            {description}
          </Card>
        ))}
      </div> */}
    </main>
  );
}
