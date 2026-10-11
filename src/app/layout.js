import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: "#DA7756",
};

export const metadata = {
  title: "SurakshaShield — Check Suspicious Messages, Links & Digital Threats",
  description: "Free, instant, privacy-first scam verification. Analyze suspicious SMS, WhatsApp alerts, unverified APK links, phone numbers, and screenshots before you click.",
  keywords: ["scam checker", "phishing detector", "cyber fraud verification", "TRAI DLT check", "1930 cyber helpline", "UPI scam detection"],
  authors: [{ name: "SurakshaShield Security Team" }],
  manifest: "/manifest.json",
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "SurakshaShield",
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    title: "SurakshaShield — Check Suspicious Messages, Links & Digital Threats",
    description: "Instant second opinion for suspicious texts, screenshots, and links. Free, private, and stateless.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-text-primary selection:bg-accent/20 selection:text-accent overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
