import DarkModeToggle from "./components/DarkModeToggle/DarkModeToggle";
import { Nunito_Sans } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  weight: ["300", "600", "800"],
});

export const metadata = {
  title: "Where in the world",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={nunitoSans.className}>
      <body>
        <nav className="h-20 flex items-center px-24 mb-16 justify-between drop-shadow">
          <Link href={"/"}>
            <h1 className="text-2xl font-extrabold">Where in the world?</h1>
          </Link>
          <DarkModeToggle />
        </nav>
        <div className="container mx-auto px-4 mb-16">{children}</div>
      </body>
    </html>
  );
}
