import React from "react";

// Display form errors

export default function Form({ cancel, submit, submitButtonText, elements }) {
  // Form Submit
  function handleSubmit(e) {
    e.preventDefault();
    submit();
  }

  // Form Cancel
  function handleCancel(e) {
    e.preventDefault();
    cancel();
  }

  // Return Form Component for user components
  return (
    <div>
      <form onSubmit={handleSubmit}>
        {elements()}
        <div className="grid-100 pad-bottom">
          <button className="button" type="submit">
            {submitButtonText}
          </button>
          <button className="button button-secondary" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
