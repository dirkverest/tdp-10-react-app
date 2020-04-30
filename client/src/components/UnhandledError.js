import React from 'react';

// Return errors for 500 status or other errors
export default function Error() {
    return(
        <div className="bounds">
          <h1>Error</h1>
          <p>Sorry! We just encountered an unexpected error.</p>
        </div>
    )
}