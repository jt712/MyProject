import { useState } from "react";
import "./TrainingPlanner.css";
import FilterForm from "./FilterForm/FilterForm";
import CourseCard from "./CourseCard/CourseCard";
import courses from "../data/courses";

function TrainingPlanner({ onClose, onOpenContact }) {
  // Modal मॅनेज करण्यासाठी स्टेट
  const [selectedCourse, setSelectedCourse] = useState(null);

  // techFocus आणि interest साठी String ऐवजी Array [] ठेवले आहे
  const [filters, setFilters] = useState({
    userType: "",
    experience: "Any",
    techFocus: [], // Multiple selections साठी Array
    interest: [],  // Multiple selections साठी Array
  });

  const filteredCourses = courses.filter((course) => {
    // 1. User Type Match
    const userMatch =
      !filters.userType ||
      filters.userType === "" ||
      (course.userType && course.userType.includes(filters.userType));

    // 2. Experience Match
    const expMatch =
      filters.experience === "Any" ||
      (course.experience && course.experience.includes(filters.experience));

    // 3. Tech Focus Matching (काहीही सिलेक्ट नसेल तर सगळे दाखवा, अन्यथा मॅच करा)
    const techMatch =
      !filters.techFocus ||
      filters.techFocus.length === 0 ||
      filters.techFocus.some((tech) =>
        Array.isArray(course.techFocus)
          ? course.techFocus.includes(tech)
          : course.techFocus === tech
      );

    // 4. Interest Area Matching
    const interestMatch =
      !filters.interest ||
      filters.interest.length === 0 ||
      filters.interest.some((item) =>
        Array.isArray(course.interest)
          ? course.interest.includes(item)
          : course.interest === item
      );

    return userMatch && expMatch && techMatch && interestMatch;
  });

  return (
    <div className="planner">
      <div className="planner-hero">
        <div className="planner-topbar">
          <button className="close-btn3" onClick={onClose}>
            ✕ Close
          </button>
          <span className="planner-tag">TRAINING PLANNER</span>
        </div>

        <h1 className="planner-title1">Find the right course for your team.</h1>

        <div className="planner-description">
          <p>Pick your experience level and tech focus—see tailored recommendations instantly.</p>
          <p>We guide students and professionals on the right AI/ML path.</p>
        </div>
      </div>

      <FilterForm filters={filters} setFilters={setFilters} />

      <div className="goal-box">
        <label>What goal do you want to achieve?</label>
        <textarea rows={4} placeholder="Build chatbot POCs..." />
      </div>

      <h4 className="heading">YOUR RECOMMENDED TRAININGS And Certifications</h4>
      <p>{filteredCourses.length} Courses Match Your Filters</p>

      <div className="cards-grid">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course, index) => (
            <CourseCard
              key={index}
              course={course}
              onViewCurriculum={() => setSelectedCourse(course)}
            />
          ))
        ) : (
          <h3>No Courses Found</h3>
        )}
      </div>

      {/* 💡 View Curriculum Pop-up (Modal) */}
      {selectedCourse && (
        <div className="curriculum-modal-overlay" onClick={() => setSelectedCourse(null)}>
          <div className="curriculum-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setSelectedCourse(null)}>
              ✕
            </button>
            <span className="badge">{selectedCourse.level}</span>
            <h2>{selectedCourse.title}</h2>
            <p className="modal-desc">{selectedCourse.description}</p>

            <hr />

            <h4>Curriculum Details</h4>
            <ul>
              {selectedCourse.curriculum && selectedCourse.curriculum.length > 0 ? (
                selectedCourse.curriculum.map((item, i) => <li key={i}>{item}</li>)
              ) : (
                <li>Curriculum details coming soon.</li>
              )}
            </ul>

            <div className="modal-actions">
              <button type="button" className="book-btn" onClick={onOpenContact}>
                Book now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TrainingPlanner;