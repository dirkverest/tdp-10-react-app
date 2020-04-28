import React from 'react';
import { Link } from 'react-router-dom';
import Form from './Form';
import ValidationErrors from '../ValidationErrors';

export default class UserSignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName:"",
            lastName: "",
            emailAddress: "",
            password: "",
            confirmPassword: "",
            errors: null,
        };
        this.handleFormInputChange = this.handleFormInputChange.bind(this);
        this.matchPasswords = this.matchPasswords.bind(this);
        this.submit = this.submit.bind(this);
        this.cancel = this.cancel.bind(this);
    }

    // Confirm password match
    matchPasswords(pass, confirmPass) {
        if (pass !== confirmPass) {
            const passwordMatch = ["Passwords don't match."];
            return passwordMatch
        }
    }

    // Save form input in state
    handleFormInputChange(e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
                [name]: value
        });
    }

    // Submit form
    submit() {
        const {context} = this.props;
        const {
            firstName,
            lastName,
            emailAddress,
            password,
            confirmPassword
        } = this.state;
        const noPasswordMatch = this.matchPasswords(password, confirmPassword);
        const user = {
            firstName,
            lastName,
            emailAddress,
            password,
        }

        // Reset error state
        this.setState({
            errors: null,
        })

        if (noPasswordMatch) {
            this.setState({
                errors: noPasswordMatch,
            })
        } else {
            context.data.createUser(user)
                .then(errors => {
                    if (errors.length) {
                        this.setState({
                            errors: errors,
                        })
                    } else {
                        // Auto sign in after sign up
                        context.actions.signIn(emailAddress, password);
                        this.props.history.push('/');
                    }
                })
                .catch( err => {
                    console.log(err);
                    this.props.history.push('./error');
                })
        }
    }

    // Cancel form input
    cancel(e) {
        this.setState({
            firstName:"",
            lastName: "",
            emailAddress: "",
            password: "",
            confirmPassword: "",
            errors: null,
        });
        // Link to homepage by pushing home path to the top of the react router history object
        this.props.history.push('/');
    }

    // RENDER COMPONENT: UserSignUp
    render() {
        return(
            <div className="bounds">
                <div className="grid-33 centered signin">
                    <h1>Sign Up</h1>
                    <ValidationErrors errors={this.state.errors} />
                    <Form
                        errors={this.state.errors}
                        cancel={this.cancel}
                        submit={this.submit}
                        submitButtonText="Sign Up"
                        elements={() => (
                            <React.Fragment>
                                <input 
                                    id="firstName" 
                                    name="firstName" 
                                    type="text"
                                    placeholder="First Name" 
                                    value={this.state.firstName}
                                    onChange={this.handleFormInputChange} />
                                <input 
                                    id="lastName" 
                                    name="lastName" 
                                    type="text" 
                                    placeholder="Last Name" 
                                    value={this.state.lastName}
                                    onChange={this.handleFormInputChange} />
                                <input 
                                    id="emailAddress" 
                                    name="emailAddress" 
                                    type="text" 
                                    placeholder="Email Address" 
                                    value={this.state.emailAddress} 
                                    onChange={this.handleFormInputChange} />
                                <input 
                                    id="password" 
                                    name="password" 
                                    type="password" 
                                    placeholder="Password" 
                                    value={this.state.password}
                                    onChange={this.handleFormInputChange} />
                                <input 
                                    id="confirmPassword" 
                                    name="confirmPassword" 
                                    type="password" 
                                    placeholder="Confirm Password"
                                    value={this.state.confirmPassword}
                                    onChange={this.handleFormInputChange} />
                            </React.Fragment>
                        )} />
                    <p>&nbsp;</p>
                    <p>Already have a user account? <Link to={"/signin"}>Click here</Link> to sign in!</p>
                </div>
            </div>
        )
    }
}