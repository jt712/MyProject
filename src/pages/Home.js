import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Offerings from "../components/Offerings";
import SolutionsSection from "../components/SolutionsSection";
import SoftwareServices from "../components/SoftwareServices";
import ContactForm from "../components/ContactForm";
import Capabilities from "../components/Capabilities";
import ProofSection from "../components/ProofSection";
import EngageSection from "../components/EngageSection";
import Footer from "../components/Footer";
import Products from "../components/Products";
import TrainingPlanner from "../components/TrainingPlanner/TrainingPlanner";
import ChatWidget from "../components/ChatWidget";



export default function Home(  { onOpenSolutions})
 {
  const [showSolutions, setShowSolutions] = useState(false);
  const [showSoftwareServices, setShowSoftwareServices] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [, setActiveSection] = useState("hero");
  const [showPlanner, setShowPlanner] = useState(false);



  return (
    <>
      <Navbar setActiveSection={setActiveSection} />
 {/* {activeSection === "capabilities" && (
        <Capabilities />
      )} */}

      <Hero   
      onOpenSolutions={() => setShowSolutions(true)}
      onOpenTraining={() => setShowPlanner(true)}
      onOpenSoftwareServices={() =>
        setShowSoftwareServices(true)
      }
      onOpenContact={() => setShowContact(true)}
      onOpenSolutions={() => setShowSolutions(true)}
       setActiveSection={setActiveSection} />
        {showContact && (
        <ContactForm />
      )}

      <section id="offerings">
        <Offerings
          onOpenSolutions={() => setShowSolutions(true)}
          onOpenTraining={() => setShowPlanner(true)}
          onOpenSoftwareServices={() =>
            setShowSoftwareServices(true)
          }
        />
      </section>

      {showSolutions && (
        <section id="solutions">
          <SolutionsSection  onClose={() =>
              setShowSolutions(false)
            }/>
        </section>
      )}

      {showPlanner && (
  <section id="training-consulting">
    <TrainingPlanner
      onClose={() => setShowPlanner(false)}
    />
  </section>
)}

      {showSoftwareServices && (
        <section id="software-services">
          <SoftwareServices
            onClose={() =>
              setShowSoftwareServices(false)
            }
          />
        </section>

      )}

      {/* <section id="solutions">
  <SolutionsSection />
</section> */}

  

      <section id="products">
        <Products />
      </section>

      <section id="capabilities">
  <Capabilities />
</section>

  
   <section id="case-studies">
    <ProofSection />
   </section>

<EngageSection />


   <section id="contact">
  <ContactForm />
</section>



<Footer setActiveSection={setActiveSection} />

      <ChatWidget />
    </>
  );
}