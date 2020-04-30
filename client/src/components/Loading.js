import React from "react";

// return loading animation
export default function Loading() {
  return (
    <div className="grid-33 centered signin">
      <div className="load-container">
        <div className="loader"></div>
        <h2>Loading Content</h2>
      </div>
    </div>
  );
}
