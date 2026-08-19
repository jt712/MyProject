
import { useState } from "react";

import Sidebar from "../Sidebar/Sidebar";

import Header from "../Header/Header";

import MainContent from "../MainContent/MainContent";

import Footer from "../Footer/Footer";

import RightSidebar from "../RightSidebar/RightSidebar";

import "./Layout.css";


function Layout() {

  /*
    =====================================================
    Candidate Profile
    =====================================================
  */

  const [
    profile,
    setProfile,
  ] = useState({

    ui_percentile:
      90,

    ui_category:
      "OPEN",

    ui_stream:
      "Computer Engineering",

    ui_pwd:
      false,

    ui_city:
      "Any",

    ui_gender:
      "General Pool",

    ui_university:
      "Any",

    ui_seat_type:
      "Any",

    ui_college_count:
      30,

    ui_college_preference:
      "",
  });


  /*
    =====================================================
    Chat / Counselling Messages
    =====================================================
  */

  const [
    messages,
    setMessages,
  ] = useState([]);


  return (

    <div className="layout-container">

      {/* =================================================
          LEFT SIDEBAR
      ================================================= */}

      <Sidebar
        profile={
          profile
        }

        setProfile={
          setProfile
        }

        setMessages={
          setMessages
        }
      />


      {/* =================================================
          CENTER CONTENT
      ================================================= */}

      <div className="center-content">

        <Header />


        <MainContent
          profile={
            profile
          }

          messages={
            messages
          }

          setMessages={
            setMessages
          }
        />


        <Footer
          profile={
            profile
          }

          messages={
            messages
          }

          setMessages={
            setMessages
          }
        />

      </div>


      {/* =================================================
          RIGHT SIDEBAR
      ================================================= */}

      <RightSidebar />

    </div>
  );
}


export default Layout;
