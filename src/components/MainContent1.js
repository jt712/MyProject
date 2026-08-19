import {useState} from "react";
import "./MainContent1.css";
import { sendChat } from "./services/api";

function MainContent({profile,messages,setMessages}) {

  const [prompt,setPrompt]=useState("");
  
  const handleSend=async()=>{
  
  if(prompt==="") return;
  
  const userMessage={
  role:"user",
  content:prompt
  };
  
  setMessages(prev=>[...prev,userMessage]);
  
  try{
  
  const result=await sendChat({
  
  prompt,
  
  ...profile
  
  });
  
  setMessages(prev=>[
  ...prev,
  {
  role:"assistant",
  content:result.reply
  }
  ]);
  
  }
  catch{
  
  setMessages(prev=>[
  ...prev,
  {
  role:"assistant",
  content:"Unable to connect server."
  }
  ]);
  
  }
  
  setPrompt("");
  
  };
  
  return (
 <>

  <div className="header1">
  <img src="/images/dnyai-logo.jpeg" alt="DnyanAI logo" />

  <div className="header1-content">
    <h1>MHT-CET Engineering CAP Round AI Counselor</h1>
    <p>
      Interact naturally with the AI Agent or use the manual sidebar
      controllers to extract high-end option preferences.
    </p>
  </div>
</div>


<div className="main">

<section>

<h2>📊 Master Output Preview Dashboard</h2>

<div className="preview">
No choice matrix has been generated during this active session yet.

</div>

</section>
</div>

<div className="footer1">

<div className="input-container">
<h2>💬 Chat with your AI Counselor</h2>
<input

value={prompt}

onChange={(e)=>setPrompt(e.target.value)}

placeholder="Tell the agent how to adjust your list..."

/>

<button onClick={handleSend}>

↑

</button>

</div>

</div>

 </>

  )
}

export default MainContent;