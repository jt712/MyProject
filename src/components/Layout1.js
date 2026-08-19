import { useState } from "react";
import LeftSidebar from "./LeftSidebar";

import MainContent1 from "./MainContent1";
import "./Layout1.css";

function Layout1() {
  const [leftOpen, setLeftOpen] = useState(true);
  const [rightOpen, setRightOpen] = useState(true);

  return (
    <div className="layout1">

      {/* Left Sidebar */}
      <div className={leftOpen ? "left-sidebar open" : "left-sidebar close"}>
        <button
          className="toggle-btn left-btn"
          onClick={() => setLeftOpen(!leftOpen)}
        >
          {leftOpen ? "<<" : ">>"}
        </button>

        {leftOpen && <LeftSidebar />}
      </div>

      {/* Main */}
      <div className="main">
        <MainContent1 />
      </div>

      {/* Right Sidebar */}
      <div className={rightOpen ? "right-sidebar open" : "right-sidebar close"}>
        <button
          className="toggle-btn right-btn"
          onClick={() => setRightOpen(!rightOpen)}
        >
          {rightOpen ? ">>" : "<<"}
        </button>
{/* 
        {rightOpen && <RightSidebar/>} */}
      </div>

    </div>
  );
}

export default Layout1;