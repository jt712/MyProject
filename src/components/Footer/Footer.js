
import "./Footer.css";

import {
  useState,
} from "react";

import {
  sendFeedback,
} from "../services/api";


function Footer({
  profile,
  messages,
  setMessages,
}) {

  const [input, setInput] =
    useState("");

  const [loading, setLoading] =
    useState(false);


  /*
    =====================================================
    SEND FOLLOW-UP MESSAGE
    =====================================================
  */

  const handleSendMessage =
    async () => {

      const text =
        input.trim();


      if (!text) {
        return;
      }


      /*
        Add user message
      */

      const userMessage = {

        id:
          Date.now(),

        type:
          "user",

        sender:
          "You",

        text:
          text,
      };


      setMessages(
        (previous) => [
          ...previous,
          userMessage,
        ]
      );


      setInput("");


      try {

        setLoading(
          true
        );


        /*
          Find latest counselling
          response.
        */

        const latestBotMessage =
          messages
            ?.filter(
              (message) =>
                message.type ===
                "bot"
            )
            ?.at(-1);


        const sessionId =
          latestBotMessage?.data
            ?.session_id ||
          latestBotMessage?.sessionId;


        if (!sessionId) {

          throw new Error(
            "Please generate the counselling report first."
          );
        }


        console.log(
          "Sending feedback:",
          {
            session_id:
              sessionId,

            feedback:
              text,
          }
        );


        /*
          Call /feedback
        */

        const response =
          await sendFeedback(
            sessionId,
            text
          );


        console.log(
          "Feedback response:",
          response
        );


        /*
          Extract counsellor response
        */

        const responseText =
          response?.counsellor_response ||
          response?.response ||
          response?.reply ||
          response?.message ||
          response?.summary ||
          "Counsellor updated your recommendations.";


        /*
          Add bot response
        */

        setMessages(
          (previous) => [
            ...previous,

            {
              id:
                Date.now() + 1,

              type:
                "bot",

              sender:
                "Counsellor",

              text:
                responseText,

              data:
                response,

              sessionId:
                response?.session_id ||
                sessionId,
            },
          ]
        );

      } catch (error) {

        console.error(
          "Feedback Error:",
          error
        );


        setMessages(
          (previous) => [
            ...previous,

            {
              id:
                Date.now() + 1,

              type:
                "error",

              sender:
                "System",

              text:
                error?.message ||
                "Unable to process your request.",
            },
          ]
        );

      } finally {

        setLoading(
          false
        );
      }
    };


  /*
    =====================================================
    ENTER KEY
    =====================================================
  */

  const handleKeyDown =
    (e) => {

      if (
        e.key ===
          "Enter" &&
        !e.shiftKey
      ) {

        e.preventDefault();

        handleSendMessage();
      }
    };


  return (

    <footer className="footerr">

      <div className="footerr-inner">

        {/* =================================================
            INPUT
        ================================================= */}

        <input
          type="text"

          className="chat-input"

          value={
            input
          }

          onChange={(e) =>
            setInput(
              e.target.value
            )
          }

          onKeyDown={
            handleKeyDown
          }

          placeholder="Tell the agent how to adjust your list..."

          disabled={
            loading
          }
        />


        {/* =================================================
            SEND BUTTON
        ================================================= */}

        <button
          className="send-btn"

          onClick={
            handleSendMessage
          }

          disabled={
            loading ||
            !input.trim()
          }
        >

          {loading
            ? "Sending..."
            : "Send ➤"}

        </button>

      </div>

    </footer>
  );
}


export default Footer;
