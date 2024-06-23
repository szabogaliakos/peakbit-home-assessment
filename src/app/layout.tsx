import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Header from "@/src/app/_components/Header";
import "@/src/app/global.css";

const poppins = Poppins({ weight: "600", subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | Peakbit Felmérő Feladat",
    default: "Üdvözöllek az oldalon",
  },
  description: "React Next.js felmérő feladat",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hu">
      <body className={poppins.className}>
        <Header />

        <main className="flex min-h-screen flex-col pt-20">
          <section className="grow">{children}</section>
        </main>
      </body>
    </html>
  );
}
