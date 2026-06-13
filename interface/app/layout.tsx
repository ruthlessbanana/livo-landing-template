import { Inter, Poppins } from "next/font/google";

import type { Metadata } from "next";

import type { ReactNode } from "react";

import { parsePageSpec } from "@livo/landing-kit";
import pageSpec from "../landing/page-spec.json";

const spec = parsePageSpec(pageSpec);

import "./globals.css";



const inter = Inter({

  variable: "--font-inter",

  subsets: ["latin"],

  display: "swap",

});



const heading = Poppins({

  variable: "--font-heading",

  subsets: ["latin"],

  weight: ["400", "500", "600", "700"],

  display: "swap",

});



export const metadata: Metadata = {

  title: spec.meta.title,

  description: spec.meta.description,

};



export default function RootLayout({ children }: { children: ReactNode }) {

  return (

    <html lang="en" className={`${inter.variable} ${heading.variable}`}>

      <body className="font-sans antialiased">{children}</body>

    </html>

  );

}

