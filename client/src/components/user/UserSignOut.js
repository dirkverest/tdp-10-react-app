import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";

export default ({ context }) => {
  // side effect of function: Similar to componentDidMount and componentDidUpdate
  useEffect(() => {
    // Call signout function in data.js
    context.actions.signOut();
  });
  // Return Redirect
  return <Redirect to="/" />;
};
