import React from "react";
import ValidationErrors from "../ValidationErrors";

export default function Form({
  formTitle,
  courseInfo,
  inputChange,
  submitText,
  submit,
  cancel,
}) {
    
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

  // return form based on requesting component (update or create course)
  return (
    <div className="bounds course--detail">
      <h1>{formTitle}</h1>
      <div>
        <ValidationErrors errors={courseInfo.errors} />
        <form>
          <div className="grid-66">
            <div className="course--header">
              <h4 className="course--label">Course</h4>
              <div>
                <input
                  id="title"
                  name="title"
                  type="text"
                  className="input-title course--title--input"
                  placeholder="Title"
                  value={courseInfo.title}
                  onChange={inputChange}
                />
              </div>
              <p>
                By {courseInfo.userInfo.fistName} {courseInfo.userInfo.lastName}
              </p>
            </div>
            <div className="course--description">
              <div>
                <textarea
                  id="description"
                  name="description"
                  className=""
                  placeholder="Course description..."
                  value={courseInfo.description}
                  onChange={inputChange}
                />
              </div>
            </div>
          </div>
          <div className="grid-25 grid-right">
            <div className="course--stats">
              <ul className="course--stats--list">
                <li className="course--stats--list--item">
                  <h4>Estimated Time</h4>
                  <div>
                    <input
                      id="estimatedTime"
                      name="estimatedTime"
                      type="text"
                      className="course--time--input"
                      placeholder="Hours"
                      value={courseInfo.estimatedTime}
                      onChange={inputChange}
                    />
                  </div>
                </li>
                <li className="course--stats--list--item">
                  <h4>Materials Needed</h4>
                  <div>
                    <textarea
                      id="materialsNeeded"
                      name="materialsNeeded"
                      className=""
                      placeholder="List materials..."
                      value={courseInfo.materialsNeeded}
                      onChange={inputChange}
                    />
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="grid-100 pad-bottom">
            <button className="button" type="submit" onClick={handleSubmit}>
              {submitText}
            </button>
            <button className="button button-secondary" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
