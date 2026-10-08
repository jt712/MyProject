import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Offerings from "../components/Offerings";
import ContactForm from "../components/ContactForm";
import Capabilities from "../components/Capabilities";
import ProofSection from "../components/ProofSection";
import EngageSection from "../components/EngageSection";
import Footer from "../components/Footer";
import Products from "../components/Products";
import ChatWidget from "../components/ChatWidget";
import CareerCounseling from "../components/CareerCounseling";

export default function Home() {
  const [activeOffering, setActiveOffering] = useState(null);
  const [showCareerCounselling, setShowCareerCounselling] = useState(false);
  const [, setActiveSection] = useState("hero");

  const openContactSection = () => {
    setShowCareerCounselling(false);
    setTimeout(() => {
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    }, 0);
  };

  return (
    <>
      <Navbar
        setActiveSection={setActiveSection}
        onOpenCareerCounselling={() => setShowCareerCounselling(true)}
      />

      <Hero
        onOpenSolutions={() => setActiveOffering("solutions")}
        onOpenTraining={() => setActiveOffering("planner")}
        onOpenSoftwareServices={() => setActiveOffering("software")}
        onOpenContact={openContactSection}
        setActiveSection={setActiveSection}
      />

      {/* Offerings Section च्या आतच आपण Detail Views दाखवणार आहोत */}
      <section id="offerings">
        <Offerings
          activeOffering={activeOffering}
          setActiveOffering={setActiveOffering}
        />
      </section>

      <section id="products">
        <Products />
      </section>

      <section id="capabilities">
        <Capabilities />
      </section>

      <section id="case-studies">
        <ProofSection />
      </section>

      <EngageSection onOpenCareerCounselling={() => setShowCareerCounselling(true)} />

      <section id="contact">
        <ContactForm />
      </section>

      {showCareerCounselling && (
        <CareerCounseling
          onClose={() => setShowCareerCounselling(false)}
          onEnquire={openContactSection}
        />
      )}

      <Footer setActiveSection={setActiveSection} />
      <ChatWidget onEnquire={openContactSection} />
    </>
  );
}