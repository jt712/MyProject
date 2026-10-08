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
import Layout1 from "./components/Layout1";
import BankingAgent from "./components/BankingAgent";
import Login from "./components/login";
import AIAccelerator from "./components/AIAAccelerator";
import Signup from "./pages/Signup";
import RagCards from "./components/RagCards";
import ProtectedAgentRoute from "./components/ProtectedAgentRoute";
import CounsellorWorkspaceLayout from "./components/CounsellorWorkspaceLayout";


function App() {
  return (
    <>
      <Routes>
        {/* Public Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/products" element={<Products />} />
        <Route path="/contact" element={<ContactForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Sub-Cards Pages (Open Without Login) */}
        <Route path="/educagent" element={<Educagent />} />
        <Route path="/rag-cards" element={<RagCards />} />
        <Route path="/bankingagent" element={<BankingAgent />} />
        <Route path="/layout1" element={<Layout1 />} />
        <Route path="/rag-ai" element={<AIAccelerator />} />

        {/* Protected Feature Pages (Requires Login & Agent Permission) */}
        <Route
          path="/agent"
          element={
            <ProtectedAgentRoute agentId="teacheragent">
              <Agent />
            </ProtectedAgentRoute>
          }
        />

        <Route
          path="/layout"
          element={
            <ProtectedAgentRoute agentId="capcounsellor">
              <Layout />
            </ProtectedAgentRoute>
          }
        />
        
        <Route path="/aicounsellor" element={<ProtectedAgentRoute agentId="counsellor">
          <CounsellorWorkspaceLayout />
        </ProtectedAgentRoute>} />

        <Route
          path="/bankingagent"
          element={
            <ProtectedAgentRoute agentId="bankingagent">
              <BankingAgent />
            </ProtectedAgentRoute>
          }
        />

        <Route
          path="/ai-accelerator"
          element={
            <ProtectedAgentRoute agentId="ai-accelerator">
              <AIAccelerator />
            </ProtectedAgentRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;