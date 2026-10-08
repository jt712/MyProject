import "./CourseCard.css";

function CourseCard({ course, onViewCurriculum }) {
  return (
    <div className="course-card">
      <div className="course-top">
        <span className="badge">{course.level}</span>
        <span className="duration">{course.duration}</span>
      </div>

      <h3>{course.title}</h3>
      <p>{course.description}</p>

      <button className="view-curriculum-btn" onClick={onViewCurriculum}>
        View Curriculum
      </button>
    </div>
  );
}

export default CourseCard;