import type { Metadata } from "next";
import "./globals.css";
import ReactQueryProvider from "@/components/providers/query-client";
import { Toaster } from "sonner";



export const metadata: Metadata = {
  title: "Spotter AI frontend assessment",
  description: "ELD and map generator web app with next js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`font-jakarta antialiased`}
      >
       <ReactQueryProvider>
        {children}
       </ReactQueryProvider>
       <Toaster />
      </body>
    </html>
  );
}
