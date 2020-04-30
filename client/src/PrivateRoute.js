import React from "react";
import { Route, Redirect } from "react-router-dom";
import { Consumer } from "./Context";

/**
 * () returns a consumer component with a Redirect or Original component based on authorization status
 * based on the component that is passed to the function
 */

export default ({ component: Component, ...rest }) => {
  return (
    <Consumer>
      {(context) => (
        // Return initial route
        <Route
          {...rest}
          render={(props) =>
            context.authenticatedUser ? (
              <Component {...props} />
            ) : (
              // Return redirect
              <Redirect
                to={{
                  pathname: "/signin",
                  state: { from: props.location },
                }}
              />
            )
          }
        />
      )}
    </Consumer>
  );
};
