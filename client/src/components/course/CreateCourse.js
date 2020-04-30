import React from "react";
import Form from "./Form";

export default class CreateCourse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
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
   * On mount: if authenticated user, set state of user variables
   * else, push forbidden path (redundant security)
   */
  componentDidMount() {
    const { authenticatedUser } = this.props.context;
    if (authenticatedUser) {
      this.setState({
        userId: authenticatedUser.id,
        userInfo: {
          fistName: authenticatedUser.firstName,
          lastName: authenticatedUser.lastName,
        },
      });
    } else {
      this.props.history.push("../../forbidden");
    }
  }

  // Save form input in state
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

    context.data
      .courseCreate(course)
      // If error object returns, set error state
      .then(
        (response) => {
          if (response.errors) {
            this.setState({
              errors: response.errors,
            });
            // Else redirect based on returned Location Header
          } else {
            this.props.history.push(response.headers.get("Location"));
          }
        },
        (error) => {
          this.props.history.push("../../error");
        }
      );
  }

  // Link to homepage by pushing home path to the top of the react router history object
  cancel(e) {
    this.props.history.push("/");
  }

  // RENDER FORM COMPONENT
  render() {
    return (
      <Form
        formTitle="Create Course"
        courseInfo={this.state}
        inputChange={this.handleFormInputChange}
        submitText="Update Course"
        submit={this.handleSubmit}
        cancel={this.cancel}
      />
    );
  }
}
