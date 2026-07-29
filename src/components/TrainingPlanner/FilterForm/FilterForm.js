import "./FilterForm.css";

function FilterForm({ filters, setFilters }) {
  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="filters">

      <div className="filter-group">
        <label>You are</label>

        <select
          name="userType"
          value={filters.userType}
          onChange={handleChange}
        >
          <option value="">All</option>
          <option>Student</option>
          <option>Early-career professional</option>
          <option>Experienced, switching to Data/AI</option>
          <option>Manager/Leader enabling team</option>
        </select>
      </div>

      <div className="filter-group">
        <label>Years of Experience</label>

        <select
          name="experience"
          value={filters.experience}
          onChange={handleChange}
        >
          <option>Any</option>
          <option>0-2 years</option>
          <option>3-6 years</option>
          <option>7+ years</option>
        </select>
      </div>

      <div className="filter-group">
        <label>Tech Focus</label>

        <select
          name="techFocus"
          value={filters.techFocus}
          onChange={handleChange}
        >
          <option>Any</option>
          <option>Python</option>
          <option>ML</option>
          <option>GenAI</option>
          <option>Data</option>
          <option>MLOps</option>
          <option>Product</option>
          <option>Copilot</option>
          <option>Agentic</option>
        </select>
      </div>

      <div className="filter-group">
        <label>Interest Area</label>

        <select
          name="interest"
          value={filters.interest}
          onChange={handleChange}
        >
          <option>Any</option>
          <option>GenAI Chatbot</option>
          <option>Prompt Engineering</option>
          <option>Copilot</option>
          <option>MLOps</option>
          <option>Data Science</option>
          <option>Machine Learning</option>
          <option>GenAI</option>
          <option>Agentic AI</option>
          <option>Python</option>
        </select>
      </div>

    </div>
  );
}

export default FilterForm;