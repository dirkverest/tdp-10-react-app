import React from 'react';

// Return forbidden component for unauthorized path entry
export default function NotFound() {
    return(
        <div className="bounds">
            <h1>Forbidden</h1>
            <p>Oh oh! You are not authorized to access this page.</p>
        </div>
    )
}