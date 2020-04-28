import React from 'react';
import Markdown from 'react-markdown';

// Import Components
import Loading from '../Loading';
import ActionBar from './ActionBar';

export default class CourseDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      courseDetails: null,
    };
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    this.props.context.data.courseDetails(`${this.props.match.params.id}`)
    .then(res => res.json())
    .then(
    (result) => {
      if(result.id) {
        this.setState({
          isLoaded: true,
          courseDetails: result,
      });
      } else if (result.message) {
        this.props.history.push('/notfound');
      }
    },
    (error) => {
        this.setState({
            isLoaded: true,
            error,
        });
    });
  }

  // Delete current Course
  handleDelete() {
    this.props.context.data.couseDelete(`${this.state.courseDetails.id}`)
      .then(response => {
        this.props.history.push('/');
      });
  }


  // RENDER COURSE DETAILS COMPONENTS
  render() {
    if (!this.state.isLoaded) {
      return (
        <div className="bounds">
          <Loading />
        </div>
      )
    } else if (this.state.isLoaded) {
      const course = this.state.courseDetails;
      const authUserId = 
        this.props.context.authenticatedUser === null ? 
        false 
        :
        this.props.context.authenticatedUser.id;
      return (
        <div>
          <ActionBar 
            id={course.id} 
            courseUserId={course.User.id} 
            currentUserId={authUserId}
            handleDelete={this.handleDelete}
          />
          <div className="bounds course--detail">
            
            <div className="grid-66">
              <div className="course--header">
                <h4 className="course--label">Course</h4>
                <h3 className="course--title">{course.title}</h3>
                <p>By {course.User.firstName} {course.User.lastName}</p>
              </div>
      
              <div className="course--description">
                <Markdown source={course.description} />
              </div> 
            </div>
      
            <div className="grid-25 grid-right">
              <div className="course--stats">
                <ul className="course--stats--list">
                  <li className="course--stats--list--item">
                    <h4>Estimated Time</h4>
                    <h3>{course.estimatedTime}</h3>
                  </li>
                  <li className="course--stats--list--item">
                    <h4>Materials Needed</h4>
                    <Markdown source={course.materialsNeeded} />
                  </li>
                </ul>
              </div>
            </div>
      
          </div>
        </div>
      )
    }
  }
}