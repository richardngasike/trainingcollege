"use client";
import { AuthProvider } from "@/context/AuthContext";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { Toaster } from "react-hot-toast";
import "@/app/globals.css";
import { usePathname } from "next/navigation";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="St John's Teachers Training College - Inspiring teachers, Empowering minds. Kenya's premier teacher education institution." />
        <meta name="keywords" content="teacher training Kenya, St Johns College, education, P1 certificate, Nairobi" />
        <meta property="og:title" content="St John's Teachers Training College" />
        <meta property="og:description" content="Inspiring teachers, Empowering minds. Kenya's premier teacher training institution." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/images/og-image.jpg" />
        <link rel="icon" href="/favicon.ico" />
        <title>St John's Teachers Training College | Inspiring Teachers, Empowering Minds</title>
      </head>
      <body>
        <AuthProvider>
          <Toaster position="top-right" toastOptions={{ duration: 4000 }} />
          <LayoutShell>{children}</LayoutShell>
        </AuthProvider>
      </body>
    </html>
  );
}

function LayoutShell({ children }) {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith("/dashboard");
  const isAuth = ["/login", "/register", "/forgot-password"].includes(pathname);

  return (
    <>
      {!isDashboard && !isAuth && <Navbar />}
      <main>{children}</main>
      {!isDashboard && !isAuth && <Footer />}
    </>
  );
}
