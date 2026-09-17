import { Navigate, useLocation } from "react-router-dom";
import { getCurrentUser } from "../auth";

function ProtectedAgentRoute({ agentId, agentName, children }) {
  const location = useLocation();

  // Route state किंवा local storage मधून युजर मिळवणे
  const user = location.state?.loggedInUser || getCurrentUser();

  const isAdmin = user?.role === "admin";
  const allowedAgents = Array.isArray(user?.allowedAgents) ? user.allowedAgents : [];
  const hasAccess = isAdmin || allowedAgents.includes(agentId);

  // युजर लॉगिन नसेल किंवा त्याला त्या एजंटचा ॲक्सेस नसेल
  if (!user || !hasAccess) {
    return (
      <Navigate
        to="/login"
        replace
        state={{
          redirectTo: location.pathname,
          targetAgentId: agentId, // Login.jsx शी मॅच होण्यासाठी
          agentId: agentId,
          targetAgentName: agentName || agentId,
        }}
      />
    );
  }

  return children;
}

export default ProtectedAgentRoute;