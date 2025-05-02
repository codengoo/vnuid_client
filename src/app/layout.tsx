import { Lobster, Prompt } from "next/font/google";
import "./globals.css";

const lobster = Lobster({
  subsets: ["vietnamese"],
  weight: "400",
  variable: "--font-lobster",
});
const prompt = Prompt({
  subsets: ["vietnamese"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-prompt",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${lobster.variable} ${prompt.variable} font-prompt`}>
        {children}
      </body>
    </html>
  );
}
