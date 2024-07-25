import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });


import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
    
import { CustomEase } from "gsap/CustomEase";
import { RoughEase, ExpoScaleEase, SlowMo } from "gsap/EasePack";
    
import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Observer } from "gsap/Observer";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { Draggable } from "gsap/Draggable";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { EaselPlugin } from "gsap/EaselPlugin";
import { PixiPlugin } from "gsap/PixiPlugin";
import { TextPlugin } from "gsap/TextPlugin";
import { CartProvider } from "./data/providers/Cart";
import Header from "./components/Header";
import Footer from "./components/Footer";

gsap.registerPlugin(useGSAP,Flip,ScrollTrigger,Observer,ScrollToPlugin,Draggable,MotionPathPlugin,EaselPlugin,PixiPlugin,TextPlugin,RoughEase,ExpoScaleEase,SlowMo,CustomEase);


export const metadata = {
  title: "Deep's AI Shop",
  description: "A store where the products don't matter, but they were made with AI.",
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>
          <Header/>
          <main className="flex flex-col min-h-screen pt-2 pb-24 px-24">
            {children}
          </main>
          <Footer/>
        </CartProvider>
      </body>
    </html>
  );
}
