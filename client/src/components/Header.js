import React from 'react';
import { 
  NavLink, 
  Link 
} from 'react-router-dom';

export default function Header(props) {

    const authUser = props.context.authenticatedUser;
    return(
      <div className="header">
        <div className="bounds">
            <Link to={"/"}>
              <h1 className="header--logo">Courses</h1>
            </Link>
          <nav>
              { authUser ?
                <React.Fragment>
                  <span>Welcome, {authUser.firstName} {authUser.lastName}</span>
                  <NavLink exact to="/signout" className="signout">Sign Out</NavLink>
                </React.Fragment>
                :
                <React.Fragment>
                  <NavLink exact to="/signup" className="signup">Sign Up</NavLink>
                  <NavLink exact to="/signin" className="signin">Sign In</NavLink>
                </React.Fragment>
              }
          </nav>
        </div>
      </div>
    )
}