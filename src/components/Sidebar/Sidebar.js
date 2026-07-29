import "./Sidebar.css";
import { useState } from "react";
import { sendChat } from "../services/api";

function Sidebar({ profile, setProfile }) {
  const [showSidebar, setShowSidebar] = useState(true);

 const handleGenerateReport = async () => {
  try {
    const response = await sendChat({
      prompt:
        "Generate my initial baseline preference sheet layout mapping with exactly 10 dream, 10 target and 10 safety choices sequentially.",
      ui_percentile: profile.ui_percentile,
      ui_category: profile.ui_category,
      ui_stream: profile.ui_stream,
      ui_pwd: profile.ui_pwd,
      ui_city: profile.ui_city,
      ui_gender: profile.ui_gender,
      ui_university: profile.ui_university,
    });

    console.log(response);

    alert(response.reply);

    // Later:
    // setReport(response.preview_data);

  } catch (err) {
    console.error(err);

    if (err.response) {
      alert(err.response.data.detail);
    } else {
      alert("Unable to connect to server.");
    }
  }
};

  return (
    <>
     {!showSidebar && (
  <button
    className="toggle-btnn floating"
    onClick={() => setShowSidebar(true)}
  >
    &raquo;
  </button>

  
)}

                  <button
  className="toggle-btnn"
  onClick={() => setShowSidebar(false)}
>
  &laquo;
</button>
     
      {showSidebar && (
        
        <div className="sidebar">
  
          <div className="sidebar-header">
            <h2>📋 Candidate Profile Controls</h2>

          
          </div>

          <label className="label">MHT-CET Percentile Score</label>
          <input
            type="number"
            value={profile.ui_percentile}
            onChange={(e) =>
              setProfile({
                ...profile,
                ui_percentile: Number(e.target.value),
              })
            }
          />

          {/* <label>JEE Percentile Score</label>
          <input
            type="number"
            value={profile.JEE_Percentile}
            onChange={(e) =>
              setProfile({
                ...profile,
                JEE_Percentile: Number(e.target.value),
              })
            }
          /> */}

          <label className="label">Caste Reservation Pool</label>
          <select
            className="custom-select"
            value={profile.ui_category}
            onChange={(e) =>
              setProfile({
                ...profile,
                ui_category: e.target.value,
              })
            }
          >
            <option value="OPEN">OPEN</option>
            <option value="OBC">OBC</option>
            <option value="SC">SC</option>
            <option value="ST">ST</option>
            <option value="EWS">EWS</option>
            <option value="TFWS">TFWS</option>
          </select>

          <label className="label">Target Branches</label>
          <select
            className="custom-select"
            value={profile.ui_stream}
            onChange={(e) =>
              setProfile({
                ...profile,
                ui_stream: e.target.value,
              })
            }
          >
            <option value="CS">Computer Science</option>
            <option value="IT">Information Technology</option>
            <option value="AI/ML">AI / ML</option>
            <option value="DS">Data Science</option>
            <option value="ENTC">ENTC</option>
            <option value="MECH">Mechanical</option>
            <option value="CIVIL">Civil</option>
            <option value="ELECTRICAL">Electrical</option>
          </select>

          <div className="switch-row">
            <span className="span">Registered PWD Status</span>

            <label className="switch">
              <input
                type="checkbox"
                checked={profile.ui_pwd}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    ui_pwd: e.target.checked,
                  })
                }
              />
              <span className="slider"></span>
            </label>
          </div>

          <h3 className="h3">Optional Preferences</h3>

          <label className="label">Preferred College</label>
          <input
            type="text"
            placeholder="Any"
            value={profile.ui_university}
            onChange={(e) =>
              setProfile({
                ...profile,
                ui_university: e.target.value,
              })
            }
          />

          <label className="label">Preferred City</label>
          <input
            type="text"
            placeholder="Any"
            value={profile.ui_city}
            onChange={(e) =>
              setProfile({
                ...profile,
                ui_city: e.target.value,
              })
            }
          />

          <label className="label">Gender</label>

          <div className="radio-group">
            <label className="radio-option">
              <input
                type="radio"
                name="gender"
                value="General Pool"
                checked={profile.ui_gender === "General Pool"}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    ui_gender: e.target.value,
                  })
                }
              />
              <span className="span">General Pool</span>
            </label>

            <label className="radio-option">
              <input
                type="radio"
                name="gender"
                value="Female"
                checked={profile.ui_gender === "Female"}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    ui_gender: e.target.value,
                  })
                }
              />
              <span>Female</span>
            </label>
          </div>

          <div
            className="report-btn"
            onClick={handleGenerateReport}
          >
            Direct Generate Report Sheet 🚀 
          </div>
        </div>
      )}
    </>
  );
}

export default Sidebar;