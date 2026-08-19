import "./LeftSidebar.css";

function LeftSidebar({ profile = {}, setProfile = () => {} }) {
  const handleChange = (key, value) => {
    setProfile((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="left-sidebar">
      <h2>📋 Candidate Profile Controls</h2>

      <label>MHT-CET Percentile Score</label>
      <input
        type="number"
        value={profile.ui_percentile ?? 94.25}
        onChange={(e) => handleChange("ui_percentile", e.target.value)}
      />

      <label>JEE Percentile Score</label>
      <input
        type="number"
        value={profile.ui_jee_percentile ?? 92.10}
        onChange={(e) => handleChange("ui_jee_percentile", e.target.value)}
      />

      <label>Caste Reservation Pool</label>
      <select
        value={profile.ui_category ?? "OPEN"}
        onChange={(e) => handleChange("ui_category", e.target.value)}
      >
        <option>OPEN</option>
        <option>OBC</option>
        <option>SC</option>
        <option>ST</option>
        <option>EWS</option>
        <option>TFWS</option>
      </select>

      <label>Target Branch</label>
      <select
        value={profile.ui_stream ?? "CS"}
        onChange={(e) => handleChange("ui_stream", e.target.value)}
      >
        <option>CS</option>
        <option>IT</option>
        <option>AI/ML</option>
        <option>DS</option>
        <option>Mechanical</option>
        <option>Civil</option>
        <option>Electrical</option>
      </select>

      <div className="switch-roww1">
        <span>Registered PWD</span>
        <input
          type="checkbox"
          checked={profile.ui_pwd ?? false}
          onChange={(e) => handleChange("ui_pwd", e.target.checked)}
        />
      </div>

      <h3>Optional Preferences</h3>

      <label>Preferred University</label>
      <input
        type="text"
        value={profile.ui_university ?? ""}
        onChange={(e) => handleChange("ui_university", e.target.value)}
      />

      <label>Preferred City</label>
      <input
        type="text"
        value={profile.ui_city ?? ""}
        onChange={(e) => handleChange("ui_city", e.target.value)}
      />

      <label>Gender</label>
      <select
        value={profile.ui_gender ?? "Male"}
        onChange={(e) => handleChange("ui_gender", e.target.value)}
      >
        <option>Male</option>
        <option>Female</option>
      </select>
    </div>
  );
}

export default LeftSidebar;