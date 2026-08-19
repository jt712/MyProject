
import "./Sidebar.css";

import { useState } from "react";

import {
  sendCounselRequest,
} from "../services/api";


function Sidebar({
  profile,
  setProfile,
  setMessages,
}) {

  const [open, setOpen] =
    useState(true);

  const [loading, setLoading] =
    useState(false);


  /* =====================================================
     UPDATE PROFILE
  ===================================================== */

  const updateProfile = (
    field,
    value
  ) => {

    setProfile((previous) => ({
      ...previous,

      [field]: value,
    }));
  };


  /* =====================================================
     GENERATE COUNSELLING REPORT
  ===================================================== */

  const handleGenerateReport =
    async () => {

      try {

        setLoading(true);

        /*
          Clear previous messages
        */

        setMessages([]);

        console.log(
          "Profile sent to backend:",
          profile
        );


        /*
          Call /counsel
        */

        const response =
          await sendCounselRequest(
            profile
          );


        console.log(
          "Backend response:",
          response
        );


        /*
          Get response text
        */

        let messageText =
          "";


        if (
          response?.summary
        ) {

          messageText =
            response.summary;

        } else if (
          response?.reply
        ) {

          messageText =
            response.reply;

        } else if (
          response?.message
        ) {

          messageText =
            response.message;

        } else if (
          response?.response
        ) {

          messageText =
            response.response;

        } else {

          messageText =
            "Recommendations generated successfully.";
        }


        /*
          Save result into messages
        */

        setMessages([
          {
            id:
              Date.now(),

            type:
              "bot",

            sender:
              "Counsellor",

            text:
              messageText,

            data:
              response,

            sessionId:
              response?.session_id,
          },
        ]);

      } catch (error) {

        console.error(
          "Generate Report Error:",
          error
        );


        setMessages([
          {
            id:
              Date.now(),

            type:
              "error",

            sender:
              "System",

            text:
              error?.message ||
              "Unable to connect to counselling server. Please check whether the backend is running.",
          },
        ]);


        alert(
          error?.message ||
          "Unable to connect to server. Please make sure FastAPI is running on port 8000."
        );

      } finally {

        setLoading(false);
      }
    };


  return (

    <div
      className={`sidebar-container ${
        open
          ? "open"
          : "close"
      }`}
    >

      {/* =================================================
          HEADER
      ================================================= */}

      <div
        className="candidate-header"
        onClick={() =>
          setOpen(!open)
        }
      >

        <span className="header-icon">
          ☰
        </span>

        <span className="header-label">
          Candidate Profile Controls
        </span>

      </div>


      {/* =================================================
          SIDEBAR CONTENT
      ================================================= */}

      {open && (

        <div className="sidebar">

          {/* =============================================
              PERCENTILE
          ============================================= */}

          <label className="label">
            MHT-CET Percentile Score
          </label>

          <input
            type="number"

            step="0.01"

            min="0"

            max="100"

            value={
              profile.ui_percentile
            }

            onChange={(e) =>
              updateProfile(
                "ui_percentile",
                Number(
                  e.target.value
                )
              )
            }
          />


          {/* =============================================
              CATEGORY
          ============================================= */}

          <label className="label">
            Caste Reservation Pool
          </label>

          <select
            className="custom-select"

            value={
              profile.ui_category
            }

            onChange={(e) =>
              updateProfile(
                "ui_category",
                e.target.value
              )
            }
          >

            <option value="OPEN">
              OPEN
            </option>

            <option value="OBC">
              OBC
            </option>

            <option value="SC">
              SC
            </option>

            <option value="ST">
              ST
            </option>

            <option value="EWS">
              EWS
            </option>

            <option value="NT-A">
              NT-A
            </option>

            <option value="NT-B">
              NT-B
            </option>

            <option value="NT-C">
              NT-C
            </option>

            <option value="NT-D">
              NT-D
            </option>

            <option value="VJ">
              VJ
            </option>

            <option value="SBC">
              SBC
            </option>

          </select>


          {/* =============================================
              GENDER
          ============================================= */}

          <label className="label">
            Gender
          </label>

          <select
            className="custom-select"

            value={
              profile.ui_gender
            }

            onChange={(e) =>
              updateProfile(
                "ui_gender",
                e.target.value
              )
            }
          >

            <option value="General Pool">
              General Pool
            </option>

            <option value="Female">
              Male
            </option>

            <option value="Female">
              Female
            </option>

            <option value="Female">
              Other
            </option>

          </select>


          {/* =============================================
              TARGET BRANCH
          ============================================= */}

          <label className="label">
            Target Branch
          </label>

          <select
            className="custom-select"

            value={
              profile.ui_stream
            }

            onChange={(e) =>
              updateProfile(
                "ui_stream",
                e.target.value
              )
            }
          >

            <option value="Computer Engineering">
              Computer Engineering
            </option>

            <option value="Computer Science and Engineering">
              Computer Science and Engineering
            </option>

            <option value="Information Technology">
              Information Technology
            </option>

            <option value="Artificial Intelligence">
              Artificial Intelligence
            </option>

            <option value="Artificial Intelligence and Data Science">
              Artificial Intelligence and Data Science
            </option>

            <option value="Data Science">
              Data Science
            </option>

            <option value="Cyber Security">
              Cyber Security
            </option>

            <option value="Computer Science and Business Systems">
              Computer Science and Business Systems
            </option>

            <option value="Electronics and Telecommunication Engineering">
              Electronics and Telecommunication Engineering
            </option>

            <option value="Electronics Engineering">
              Electronics Engineering
            </option>

            <option value="Electrical Engineering">
              Electrical Engineering
            </option>

            <option value="Mechanical Engineering">
              Mechanical Engineering
            </option>

            <option value="Civil Engineering">
              Civil Engineering
            </option>

            <option value="Chemical Engineering">
              Chemical Engineering
            </option>

            <option value="Instrumentation Engineering">
              Instrumentation Engineering
            </option>

            <option value="Robotics and Automation">
              Robotics and Automation
            </option>

          </select>


          {/* =============================================
              SEAT TYPE
          ============================================= */}

          <label className="label">
            Seat / College Type
          </label>

          <select
            className="custom-select"

            value={
              profile.ui_seat_type
            }

            onChange={(e) =>
              updateProfile(
                "ui_seat_type",
                e.target.value
              )
            }
          >

            <option value="Any">
              Any
            </option>

            <option value="Government">
              Government
            </option>

            <option value="Government Aided">
              Government Aided
            </option>

            <option value="Autonomous">
              Autonomous
            </option>

            <option value="Private">
              Private
            </option>

            <option value="Minority">
              Minority
            </option>

          </select>


          {/* =============================================
              COLLEGE COUNT
          ============================================= */}

          <label className="label">
            College Count
          </label>

          <input
            type="number"

            min="1"

            max="100"

            value={
              profile.ui_college_count
            }

            placeholder="e.g. 30"

            onChange={(e) =>
              updateProfile(
                "ui_college_count",
                Number(
                  e.target.value
                )
              )
            }
          />


          {/* =============================================
              PREFERRED CITY
          ============================================= */}

          <label className="label">
            Preferred City
          </label>

          <input
            type="text"

            value={
              profile.ui_city
            }

            placeholder="e.g. Pune, Mumbai, Nagpur"

            onChange={(e) =>
              updateProfile(
                "ui_city",
                e.target.value
              )
            }
          />


          {/* =============================================
              PWD
          ============================================= */}

         


          {/* =============================================
              GENERATE BUTTON
          ============================================= */}

          <button
            className="report-btn"

            onClick={
              handleGenerateReport
            }

            disabled={
              loading
            }
          >

            {loading
              ? "Generating..."
              : "Generate Report 🚀"}

          </button>

        </div>
      )}

    </div>
  );
}


export default Sidebar;
