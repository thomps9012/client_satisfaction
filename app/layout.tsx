import Footer from "@/components/footer";
import "./globals.css";
import { Inter } from "next/font/google";
import { ReactNode } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Client Satisfaction Survey",
  description:
    "A small client satisfaction survey to help inform and improve client services",
  icons: {
    icon: "/nora_logo.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
  applicationName: "Client Satisfaction Survey",
  referrer: "origin-when-cross-origin",
  keywords: [
    "Client",
    "Satisfaction",
    "Survey",
    "Northern Ohio Recovery Association",
  ],
  authors: [{ name: "Samuel Thompson", url: "tszlau.com" }],
  colorScheme: "light",
  creator: "Samuel Thompson",
  publisher: "Samuel Thompson",
  metadataBase: new URL("https://nora-client-satisfaction.vercel.app"),
  themeColor: "#5D4E60",
  manifest: "/manifest.json",
  twitter: {
    card: "summary_large_image",
    title: "Client Satisfaction Survey",
    description:
      "A small client satisfaction survey to help inform and improve client services",
    siteID: "1640747945896169472",
    creator: "@tszlau_0",
    creatorId: "1640747945896169472",
    images: ["https://nora-client-satisfaction.vercel.app/icon.png"],
  },
  openGraph: {
    title: "Client Satisfaction Survey",
    description:
      "A small client satisfaction survey to help inform and improve client services",
    type: "website",
    url: "https://nora-client-satisfication.vercel.app",
    siteName: "Client Satisfaction Survey",
    images: "/icon.png",
    locale: "en_US",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  appleWebApp: {
    title: "Client Satisfaction Survey",
    statusBarStyle: "purple-translucent",
    startupImage: ["/icon.png"],
  },
  appLinks: {
    web: {
      url: "https://nora-client-satisfaction.vercel.app",
      should_fallback: true,
    },
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Footer />
      </body>
    </html>
  );
}
