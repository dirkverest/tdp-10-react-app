import React from 'react';
import { 
  NavLink, 
  Link 
} from 'react-router-dom';

export default function Header() {
    return(
        <div className="header">
          <div className="bounds">
            <Link exact to="/">
              <h1 className="header--logo">Courses</h1>
            </Link>
            <nav>
                <NavLink exact to="/signup" className="signup" activeClassName="active" >Sign Up</NavLink>
                <NavLink exact to="/signin" className="signin" activeClassName="active" >Sign In</NavLink>
            </nav>
          </div>
        </div>
    )
}