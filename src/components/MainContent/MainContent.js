import "./MainContent.css";

function MainContent({messages}){

return(

<div className="main">

<section>

<h2>📊 Master Output Preview Dashboard</h2>

<div className="preview">
No choice matrix has been generated during this active session yet.

</div>

</section>

<section>


{/* 
<div className="chat-box">

{
messages.map((msg,index)=>(

<div
key={index}
className={msg.role}
>

{msg.content}

</div>

))
}

</div> */}

</section>

</div>

);

}

export default MainContent;