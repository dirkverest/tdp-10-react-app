import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./stylesheets/global.css"; // Load global.css as provided in project files
import withContext from "./Context";
import PrivateRoute from "./PrivateRoute";

// Components without context
import Header from "./components/Header";
import UserSignUp from "./components/user/UserSignUp";
import UserSignIn from "./components/user/UserSignIn";
import UserSignOut from "./components/user/UserSignOut";
import Courses from "./components/course/Courses";
import CourseDetails from "./components/course/CourseDetails";
import UpdateCourse from "./components/course/UpdateCourse";
import CreateCourse from "./components/course/CreateCourse";
import Forbidden from "./components/Forbidden";
import NotFound from "./components/NotFound";
import UnhandledError from "./components/UnhandledError";

// Wrap components in context component
const HeaderWithContex = withContext(Header);
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignOutWithContext = withContext(UserSignOut);
const CoursesWithContext = withContext(Courses);
const CourseDetailsWithContext = withContext(CourseDetails);
const UpdateCourseWithContext = withContext(UpdateCourse);
const CreateCourseWithContext = withContext(CreateCourse);

/**
 * RENDER APP COMPONENT WITH:
 * Route:           /                        Context Component: Courses
 * Private-Route:   /courses/create          Context Component: CreateCourse
 * Private-Route:   /courses/:id/update      Context Component: UpdateCourse
 * Route:           /courses/:id             Context Component: CourseDetail
 * Route:           /signin                  Context Component: UserSignIn
 * Route:           /signup                  Context Component: UserSignUp
 * Route:           /signout                 Context Component: UserSignOut
 * Route:           /error                   Component:         UserSignOut
 * Route:           /forbidden               Component:         Forbidden
 * Route:           Other Routes             Component:         NotFound
 */
export default function App() {
  return (
    <BrowserRouter>
      <div>
        <HeaderWithContex />
        <hr></hr>
        <Switch>
          <Route exact path="/" component={CoursesWithContext} />
          <PrivateRoute
            exact
            path="/courses/create"
            component={CreateCourseWithContext}
          />
          <PrivateRoute
            exact
            path="/courses/:id/update"
            component={UpdateCourseWithContext}
          />
          <Route
            exact
            path="/courses/:id"
            component={CourseDetailsWithContext}
          />
          <Route exact path="/signin" component={UserSignInWithContext} />
          <Route exact path="/signup" component={UserSignUpWithContext} />
          <Route exact path="/signout" component={UserSignOutWithContext} />
          <Route exact path="/error" component={UnhandledError} />
          <Route exact path="/forbidden" component={Forbidden} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}
