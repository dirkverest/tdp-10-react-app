import React from "react";

// retrun validation error component based on input error array
export default function ValidationErrors({ errors }) {
  if (!errors) {
    return <div></div>;
  } else {
    return (
      <div>
        <h2 className="validation--errors--label">Validation errors</h2>
        <div className="validation-errors">
          <ul>
            {errors.map((error, index) => {
              return <li key={index}>{error}</li>;
            })}
          </ul>
        </div>
      </div>
    );
  }
}
