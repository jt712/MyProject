import {useState} from "react";

import "./Footer.css";
import { sendChat } from "../services/api";

function Footer({profile,messages,setMessages}){

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

return(

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

);

}

export default Footer;