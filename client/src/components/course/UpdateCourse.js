import React from "react";
import Form from "./Form";
import Loading from "../Loading";

export default class UpdateCourse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      id: "",
      title: "",
      description: "",
      estimatedTime: "",
      materialsNeeded: "",
      userId: "",
      userInfo: {
        fistName: "",
        lastName: "",
      },
    };
    // Bind functions to this
    this.handleFormInputChange = this.handleFormInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.cancel = this.cancel.bind(this);
  }

  /**
   * On mount: load course with url provided id
   * if course useId doen't matches authenticated user id push forbidden path
   * else set state of course variables (redundant security)
   * on server error, redirect to error page
   */
  componentDidMount() {
    // The get course route in the API always returns an object
    this.props.context.data
      .courseDetails(`${this.props.match.params.id}`)
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.id) {
            // if response object has id value check if user is authorized
            if (this.props.context.authenticatedUser.id !== result.User.id) {
              this.props.history.push("/Forbidden");
            } else {
              this.setState({
                errors: null,
                isLoaded: true,
                id: result.id,
                title: result.title,
                description: result.description,
                estimatedTime: result.estimatedTime,
                materialsNeeded: result.materialsNeeded,
                userId: result.User.id,
                userInfo: {
                  fistName: result.User.firstName,
                  lastName: result.User.lastName,
                },
              });
            }
          } else if (result.message) {
            // if response object contains message value, push notfound (would be nicer to display the message)
            this.props.history.push("/notfound");
          }
        },
        (error) => {
          this.props.history.push("../../error");
        }
      );
  }

  // handle form input in change basis, by setting state of course variables
  handleFormInputChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value,
    });
  }

  // Create and submit course object to correct data.js function
  handleSubmit() {
    const { context } = this.props;
    const course = {
      id: this.state.id,
      title: this.state.title,
      description: this.state.description,
      estimatedTime: this.state.estimatedTime,
      materialsNeeded: this.state.materialsNeeded,
      userId: this.state.userId,
    };

    context.data.courseUpdate(course.id, course).then(
      (response) => {
        if (response.errors) {
          this.setState({
            errors: response.errors,
          });
        } else if (response.status === 204) {
          this.props.history.push(`/courses/${course.id}`);
        }
      },
      (error) => {
        this.props.history.push("../../error");
      }
    );
  }

  cancel(e) {
    // Link to homepage by pushing home path to the top of the react router history object
    this.props.history.push(`/courses/${this.state.id}`);
  }

  // if data is loaded, render form component with form, else render form component with loading animation
  render() {
    if (!this.state.isLoaded) {
      return (
        <div className="bounds">
          <Loading />
        </div>
      );
    } else {
      return (
        <Form
          formTitle="Update Course"
          courseInfo={this.state}
          inputChange={this.handleFormInputChange}
          submitText="Update Course"
          submit={this.handleSubmit}
          cancel={this.cancel}
        />
      );
    }
  }
}
