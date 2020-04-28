import React from 'react';
import Loading from '../Loading';
import { Link  } from 'react-router-dom';

export default function CourseButton({isLoaded, course}) {
    if (!isLoaded) {
        return (<Loading />);
    } else if (isLoaded) {
        return(
            <div className="grid-33">
                <Link className="course--module course--link" to={`/courses/${course.id}`}>
                    <h4 className="course--label">Course</h4>
                    <h3 className="course--title">{course.title}</h3>
                </Link>
            </div>
        )
    }
}