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
      <head>
        <link rel="icon" href="/nora_logo.png" />
        <meta name="application-name" content="Client Satisfaction Survey" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta
          name="apple-mobile-web-app-title"
          content="Client Satisfaction Survey"
        />
        <meta
          name="description"
          content="A small client satisfaction survey to help inform client services"
        />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#5D4E60" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="theme-color" content="#5D4E60" />
        <link rel="apple-touch-icon" href="/nora_logo.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/nora_logo.png" />
        <link rel="apple-touch-icon" sizes="167x167" href="/nora_logo.png" />

        <link rel="icon" type="image/png" sizes="32x32" href="/nora_logo.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/nora_logo.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="mask-icon" href="/nora_logo.png" color="#5D4E60" />
        <link rel="shortcut icon" href="/nora_logo.png" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Client Survey Invitation" />
        <meta
          property="og:description"
          content="A small client satisfaction survey to help inform client services"
        />
        <meta property="og:site_name" content="Client Satisfaction Survey" />
        <meta
          property="og:url"
          content="https://nora-client-survey.vercel.app"
        />
        <meta
          property="og:image"
          content="https://nora-client-survey.vercel.app/nora_logo.png"
        />
      </head>
      <body className={inter.className}>{children}</body>
      <footer className="text-center sticky bottom-0">
        <Link href="https://tszlau.com" className="link">
          © {new Date().getFullYear()} ts_z
        </Link>
      </footer>
    </html>
  );
}
