/* eslint-disable @next/next/no-img-element */
import { Card } from "@milkyway-engine/ui/card";
import styles from "./page.module.css";
import Navbar from "./_components/nav";
import { Suspense } from "react";

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

export default function Page(): JSX.Element {
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

          {/* <Gradient className={styles.backgroundGradient} conic /> */}
        </div>
      </div>

      <div className="pt-8 md:pt-16 w-full max-w-[1100px]">
        <p className="text-3xl md:text-5xl font-semibold font-mono text-left mb-5">
          Transactions
        </p>

        <p className="text-xl font-medium">
          Connect to see your transaction history.
        </p>
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
