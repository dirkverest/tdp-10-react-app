import React from "react";
import { Link } from "react-router-dom";
import Loading from "../Loading";
import CourseBlocks from "./CourseBlocks";

export default class Courses extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      allCourses: [],
    };
  }

  /**
   * On mount load all course data and set to state allCourses
   * on server error, redirect to error page
   */
  componentDidMount() {
    this.props.context.data
      .coursesGetAll()
      .then((response) => response.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            allCourses: result,
          });
        },
        (error) => {
          this.props.history.push("../../error");
        }
      );
  }

  // if isLoaded render loading or animation or course component
  render() {
    if (!this.state.isLoaded) {
      return <Loading />;
    } else {
      return (
        <div className="bounds">
          {this.state.allCourses.map((course) => {
            return <CourseBlocks key={course.id} course={course} />;
          })}
          <div className="grid-33">
            <Link
              className="course--module course--add--module"
              to={"/courses/create"}
            >
              <h3 className="course--add--title">
                <svg
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  viewBox="0 0 13 13"
                  className="add"
                >
                  <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
                </svg>
                New Course
              </h3>
            </Link>
          </div>
        </div>
      );
    }
  }
}
