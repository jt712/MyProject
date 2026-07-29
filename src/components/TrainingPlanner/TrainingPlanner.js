import { useState } from "react";
import "./TrainingPlanner.css";
import FilterForm from "./FilterForm/FilterForm";
import CourseCard from "./CourseCard/CourseCard";
import courses from "../data/courses";

function TrainingPlanner({ onClose }) {

  const [showPlanner, setShowPlanner] = useState(false);

  
  const [filters, setFilters] = useState({
    userType: "",
    experience: "Any",
    techFocus: "Any",
    interest: "Any",
  });

  const filteredCourses = courses.filter((course) => {
    const userMatch =
      filters.userType === "" ||
      course.userType.includes(filters.userType);

    const expMatch =
      filters.experience === "Any" ||
      course.experience.includes(filters.experience);

    const techMatch =
      filters.techFocus === "Any" ||
      course.techFocus.includes(filters.techFocus);

    const interestMatch =
      filters.interest === "Any" ||
      course.interest.includes(filters.interest);

    return userMatch && expMatch && techMatch && interestMatch;
  });

  return (
    <div className="planner">

  <div className="planner-hero">

    <div className="planner-topbar">
      <button
        className="close-btn3"
        onClick={onClose}
      >
        ✕ Close
      </button>

      <span className="planner-tag">
        TRAINING PLANNER
      </span>
    </div>

    <h1 className="planner-title">
      Find the right course for your team.
    </h1>

    <div className="planner-description">

      <p>
        Pick your experience level and tech focus—see tailored recommendations instantly.
      </p>

      <p>
        We guide students and professionals on the right AI/ML path.
      </p>

    </div>

  </div>

      <FilterForm
        filters={filters}
        setFilters={setFilters}
      />

      <div className="goal-box">
        <label>What goal do you want to achieve?</label>

        <textarea
          rows={4}
          placeholder="Build chatbot POCs..."
        />
      </div>

      <h4 className="heading">
        YOUR RECOMMENDED TRAININGS
      </h4>

      <p>{filteredCourses.length} Courses Match Your Filters</p>

      <div className="cards-grid">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course, index) => (
            <CourseCard
              key={index}
              course={course}
            />
          ))
        ) : (
          <h3>No Courses Found</h3>
        )}
      </div>
    </div>
  );
}

export default TrainingPlanner;