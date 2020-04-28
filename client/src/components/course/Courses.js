import React from 'react';
import CourseButton from './CourseButton';

export default class Courses extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
          allCourses: [],
        };
    }
    
    componentDidMount() {
        this.props.context.data.coursesGetAll()
            .then(res => res.json())
            .then(
            (result) => {
                this.setState({
                    isLoaded: true,
                    allCourses: result,
                });
            })
            .catch( err => {
                console.log(err);
                this.props.history.push('./error');
            })
    }

    render() {
        return(
            <div className="bounds">
                {this.state.allCourses.map( course => {
                    return( <CourseButton key={course.id} isLoaded={this.state.isLoaded} course={course} />  )
                })}
                <div className="grid-33">
                    <a className="course--module course--add--module" href="create-course.html">
                    <h3 className="course--add--title">
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 13 13" className="add">
                        <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
                    </svg>New Course</h3>
                    </a>
                </div>
            </div>
        )
    }
}