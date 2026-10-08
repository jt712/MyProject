import React, { useState, useRef, useEffect } from "react";
import "./FilterForm.css";

function FilterForm({ filters, setFilters }) {
  const [openTech, setOpenTech] = useState(false);
  const [openInterest, setOpenInterest] = useState(false);

  const techRef = useRef(null);
  const interestRef = useRef(null);

  // बाहेर क्लिक केल्यावर ड्रॉपडाउन बंद होण्यासाठी
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (techRef.current && !techRef.current.contains(event.target)) {
        setOpenTech(false);
      }
      if (interestRef.current && !interestRef.current.contains(event.target)) {
        setOpenInterest(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheckboxChange = (field, value) => {
    const currentList = Array.isArray(filters[field]) ? filters[field] : [];

    let updatedList;
    if (currentList.includes(value)) {
      updatedList = currentList.filter((item) => item !== value);
    } else {
      updatedList = [...currentList, value];
    }

    setFilters({
      ...filters,
      [field]: updatedList,
    });
  };

  const techOptions = [
    "Python",
    "ML",
    "GenAI",
    "Data",
    "MLOps",
    "Product",
    "Copilot",
    "Agentic",
  ];

  const interestOptions = [
    "GenAI Chatbot",
    "Prompt Engineering",
    "Copilot",
    "MLOps",
    "Data Science",
    "Machine Learning",
    "GenAI",
    "Agentic AI",
    "Python",
  ];

  return (
    <div className="filters">
      {/* 1. You Are */}
      <div className="filter-group">
        <label>You are</label>
        <select
          className="filter-control"
          name="userType"
          value={filters.userType}
          onChange={handleChange}
        >
          <option value="">All</option>
          <option value="Student">Student</option>
          <option value="Early-career professional">Early-career professional</option>
          <option value="Experienced, switching to Data/AI">Experienced, switching to Data/AI</option>
          <option value="Manager/Leader enabling team">Manager/Leader enabling team</option>
        </select>
      </div>

      {/* 2. Years of Experience */}
      <div className="filter-group">
        <label>Years of Experience</label>
        <select
          className="filter-control"
          name="experience"
          value={filters.experience}
          onChange={handleChange}
        >
          <option value="Any">Any</option>
          <option value="0-2 years">0-2 years</option>
          <option value="3-6 years">3-6 years</option>
          <option value="7+ years">7+ years</option>
        </select>
      </div>

      {/* 3. Tech Focus Custom Dropdown */}
      <div className="filter-group custom-dropdown-container" ref={techRef}>
        <label>Tech Focus</label>
        <div className="custom-dropdown">
          <button
            type="button"
            className="filter-control dropdown-btn"
            aria-expanded={openTech}
            onClick={() => setOpenTech(!openTech)}
          >
            <span>
              {Array.isArray(filters.techFocus) && filters.techFocus.length > 0
                ? `${filters.techFocus.length} Selected`
                : "Select Tech Focus"}
            </span>
          </button>

          {openTech && (
            <div className="filter-dropdown-menu">
              {techOptions.map((tech) => (
                <label key={tech} className="filter-dropdown-item">
                  <input
                    type="checkbox"
                    checked={
                      Array.isArray(filters.techFocus) &&
                      filters.techFocus.includes(tech)
                    }
                    onChange={() => handleCheckboxChange("techFocus", tech)}
                  />
                  <span>{tech}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 4. Interest Area Custom Dropdown */}
      <div className="filter-group custom-dropdown-container" ref={interestRef}>
        <label>Interest Area</label>
        <div className="custom-dropdown">
          <button
            type="button"
            className="filter-control dropdown-btn"
            aria-expanded={openInterest}
            onClick={() => setOpenInterest(!openInterest)}
          >
            <span>
              {Array.isArray(filters.interest) && filters.interest.length > 0
                ? `${filters.interest.length} Selected`
                : "Select Interest Area"}
            </span>
          </button>

          {openInterest && (
            <div className="filter-dropdown-menu">
              {interestOptions.map((item) => (
                <label key={item} className="filter-dropdown-item">
                  <input
                    type="checkbox"
                    checked={
                      Array.isArray(filters.interest) &&
                      filters.interest.includes(item)
                    }
                    onChange={() => handleCheckboxChange("interest", item)}
                  />
                  <span>{item}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default FilterForm;