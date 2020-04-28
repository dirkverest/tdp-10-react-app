import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route
} from "react-router-dom";
import './stylesheets/global.css';

// Components without context
import Header from './components/Header';
import UserSignUp from './components/user/UserSignUp';
import UserSignIn from './components/user/UserSignIn';
import UserSignOut from './components/user/UserSignOut';
import Courses from './components/course/Courses';
import CourseDetails from './components/course/CourseDetails';
import UpdateCourse from './components/course/UpdateCourse';
import CreateCourse from "./components/course/CreateCourse";
import NotFound from './components/NotFound';
import Error from './components/Error';

// Wrap components in context component
import withContext from './Context';
const HeaderWithContex = withContext(Header);
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignOutWithContext = withContext(UserSignOut);
const CoursesWithContext = withContext(Courses);
const CourseDetailsWithContext = withContext(CourseDetails);
const UpdateCourseWithContext = withContext(UpdateCourse);
const CreateCourseWithContext = withContext(CreateCourse);

export default class App extends React.Component {

  render() {
    return (
      <BrowserRouter>
        <div>
          <HeaderWithContex />
          <hr></hr>
          <Switch>
            <Route exact path="/" component={CoursesWithContext} />
            <Route exact path="/courses/create" component={CreateCourseWithContext} />
            <Route exact path="/courses/:id/update" component={UpdateCourseWithContext} />
            <Route exact path="/courses/:id" component={CourseDetailsWithContext} />
            <Route exact path="/signin" component={UserSignInWithContext} />
            <Route exact path="/signup" component={UserSignUpWithContext} />
            <Route exact path="/signout" component={UserSignOutWithContext} />
            <Route exact path="/error" component={Error} />
          </Switch>
            <Route exact path="/notfound" component={NotFound} />
        </div>
      </BrowserRouter>
    )
  }
}
