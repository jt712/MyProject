import { useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";
import MainContent from "../MainContent/MainContent";
import Footer from "../Footer/Footer";
import "./Layout.css";

function Layout() {

  const [profile, setProfile] = useState({
    ui_percentile:94.25,
    // JEE_Percentile:92.12,
    ui_category:"OPEN",
    ui_stream:"CS",
    ui_pwd:false,
    ui_city:"Any",
    ui_gender:"General Pool",
    ui_university:"Any"
  });

  const [messages,setMessages]=useState([]);

  return (

    <div className="layout">

      <Sidebar
        profile={profile}
        setProfile={setProfile}
      />

      <div className="right-side">

        <Header/>

        <MainContent
          messages={messages}
        />

        <Footer
          profile={profile}
          messages={messages}
          setMessages={setMessages}
        />

      </div>

    </div>

  );
}

export default Layout;