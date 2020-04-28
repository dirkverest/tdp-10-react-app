import React from 'react';
import { Link } from 'react-router-dom';

export default function ActionBar({ id, courseUserId, currentUserId, handleDelete }) {
    return (
        <div className="actions--bar">
            <div className="bounds">
                <div className="grid-100">
                { courseUserId === currentUserId ?
                    <span>
                        <Link to={`/courses/${id}/update`} className="button">Update Course</Link>
                        <span className="button" onClick={handleDelete}>Delete Course</span>
                    </span>
                :
                    <span></span>
                }
                <Link to="/" className="button button-secondary">Return to List</Link>
                </div>
            </div>
        </div>
    )
}