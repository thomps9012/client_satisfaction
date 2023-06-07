import Link from "next/link";
import "./globals.css";
import { Inter } from "next/font/google";
import { ReactNode } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Client Satisfaction Survey",
  description:
    "A small client satisfaction survey to help inform client services",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <footer className="text-center sticky bottom-0">
          <Link href="https://tszlau.com" className="link">
            © {new Date().getFullYear()} ts_z
          </Link>
        </footer>
      </body>
    </html>
  );
}
