
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar"; // à créer
import Footer from "./components/Footer"; // à créer
import "swiper/css";
import "swiper/css/pagination";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// // export const metadata: Metadata = {
// //   title: "Fatou Portfolio",
// //   description: "Portfolio de Fatou GUEYE",
// // };
// export const metadata = {
//   title: "Fatou Portfolio",
//   description: "Portfolio de Fatou GUEYE",
//   icons: {
//     icon: "/icon.png",
//   },
// };
export const metadata = {
  title: "Fatou Portfolio",
  description: "Portfolio de Fatou GUEYE",

  icons: {
    icon: "/icon.png",
  },

  openGraph: {
    title: "Fatou Portfolio",
    description: "Développeuse Web & Spécialiste en Communication Digitale",
    url: "https://portfolio-blush-nine-63.vercel.app/",
    siteName: "Fatou Portfolio",
    images: [
      {
        url: "/preview.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "fr_FR",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Fatou Portfolio",
    description: "Développeuse Web & Communication Digitale",
    images: ["/preview.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-zinc-50 dark:bg-black`}
      >
        {/* Navbar visible sur toutes les pages */}
        <Navbar />

        {/* Contenu spécifique à chaque page */}
        <main className="min-h-[calc(100vh-128px)]">{children}</main>

        {/* Footer visible sur toutes les pages */}
        <Footer />
      </body>
    </html>
  );
}
