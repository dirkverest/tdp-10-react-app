import React from "react";
import { Link } from "react-router-dom";
import Form from "./Form";
import ValidationErrors from "../ValidationErrors";

export default class UserSignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emailAddress: "",
      password: "",
      errors: null,
    };
    this.handleFormInputChange = this.handleFormInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  // Save form input in state
  handleFormInputChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value,
    });
  }

  // Submit form
  handleSubmit() {
    const { emailAddress, password } = this.state;
    const { from } = this.props.location.state || { from: { pathname: "/" } };
    const user = this.props.context.actions.signIn(emailAddress, password);
    user.then(
      (user) => {
        if (user.id) {
          this.props.history.push(from);
        } else {
          const signInError = user.ERROR;
          this.setState({
            errors: [signInError],
          });
        }
      },
      (error) => {
        this.props.history.push("../../error");
      }
    );
  };

  // Cancel form input
  handleCancel() {
    this.setState({
      emailAddress: "",
      password: "",
      errors: null,
    });
    // Link to homepage by pushing home path to the top of the react router history object
    this.props.history.push("/");
  }

  // Render UserSignIn Component with form and error
  render() {
    return (
      <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign In</h1>
          <ValidationErrors errors={this.state.errors} />
          <Form
            errors={this.state.errors}
            cancel={this.handleCancel}
            submit={this.handleSubmit}
            submitButtonText="Sign In"
            elements={() => (
              <React.Fragment>
                <input
                  id="emailAddress"
                  name="emailAddress"
                  type="text"
                  placeholder="Email Address"
                  value={this.state.emailAddress}
                  onChange={this.handleFormInputChange}
                />
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.handleFormInputChange}
                />
              </React.Fragment>
            )}
          />
          <p>&nbsp;</p>
          <p>
            Don't have a user account? <Link to={"/signup"}>Click here</Link> to
            sign up!
          </p>
        </div>
      </div>
    );
  }
}
