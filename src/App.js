import { Routes, Route } from "react-router-dom";
import "./App.css";

import Home from "./pages/Home";
import TermsPage from "./components/TermsPage";
import PrivacyPage from "./components/PrivacyPage";
import Products from "./components/Products";
import Agent from "./components/Agent";
import ContactForm from "./components/ContactForm";
import Educagent from "./components/Educagent";
import Layout from "./components/Layout/Layout";

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/terms" element={<TermsPage />} />
      <Route path="/privacy" element={<PrivacyPage />} />
      <Route path="/products" element={<Products />} />
      <Route path="/agent" element={<Agent />} />
      <Route path="/contact" element={<ContactForm />} />
     <Route path="/educagent" element={<Educagent />} />
     <Route path="/layout" element={<Layout/>} ></Route>
    </Routes>

  </>
  );
}

export default App;