import React, { Component } from "react";
import Cookies from "js-cookie";
import Data from "./Data";

const Context = React.createContext();

// Provider Component
export class Provider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticatedUser: Cookies.getJSON("authenticatedUser") || null,
    };
    this.data = new Data();
    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this);
  }

  /**
   * signIn() tries to fetch an existing user
   * if error returns an error object
   * if user returns user object and sets the provider states cookies
   */
  async signIn(username, password) {
    // Create basic auth header to hide password but persist username and password
    const authHeader = btoa(`${username}:${password}`);
    const response = await this.data.getUser(authHeader);
    // Check for errors and return error response object
    if (response !== null) {
      if (response.ERROR) {
        return response;
      }
      // Set state, Set Cookie and return user response object
      this.setState({
        authenticatedUser: response,
        authHeader,
      });
      Cookies.set("authenticatedUser", JSON.stringify(response), {
        expires: 1,
      });
      Cookies.set("creds", authHeader, { expires: 1 });
      return response;
    }
  }

  // signOut() removes coekies and authenticated user
  signOut() {
    Cookies.remove("creds");
    Cookies.remove("authenticatedUser");
    this.setState({ authenticatedUser: null });
  }

  // Rende provider component
  render() {
    const { authenticatedUser } = this.state;
    const value = {
      authenticatedUser,
      data: this.data,
      actions: {
        signIn: this.signIn,
        signOut: this.signOut,
      },
    };
    return (
      <Context.Provider value={value}>{this.props.children}</Context.Provider>
    );
  }
}

// Consumer Component for private route component
export const Consumer = Context.Consumer;

// withContext() returns the input component wrapped in a context consumer component
export default function withContext(Component) {
  return function ContextComponent(props) {
    return (
      <Context.Consumer>
        {(context) => <Component {...props} context={context} />}
      </Context.Consumer>
    );
  };
}
