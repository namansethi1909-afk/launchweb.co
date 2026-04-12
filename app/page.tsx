"use client";
import Navbar from "@/components/Navbar";
import Hero from "@/components/UnseenHero";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import Team from "@/components/Team";
import TechStack from "@/components/TechStack";
import Achievements from "@/components/Achievements";
import Pricing from "@/components/Pricing";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Testimonials from "@/components/Testimonials";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Testimonials />
        <Services />
        <TechStack />
        <Portfolio />
        <Team />
        <Achievements />
        <Pricing />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
