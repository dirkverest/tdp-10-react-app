import React from "react";
import { Link } from "react-router-dom";

// Render a course block with
export default function CourseBlocks({ course }) {
  return (
    <div className="grid-33">
      <Link
        className="course--module course--link"
        to={`/courses/${course.id}`}
      >
        <h4 className="course--label">Course</h4>
        <h3 className="course--title">{course.title}</h3>
      </Link>
    </div>
  );
}
