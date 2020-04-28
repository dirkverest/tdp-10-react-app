import React from 'react';
import Form from './Form'
import Loading from '../Loading';

export default class UpdateCourse extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            id: "",
            title: "",
            description: "",
            estimatedTime: "",
            materialsNeeded: "",
            userId: "",
            userInfo: {
                fistName: "",
                lastName: "",
            }
        };
        this.handleFormInputChange = this.handleFormInputChange.bind(this);
        this.submit = this.submit.bind(this);
        this.cancel = this.cancel.bind(this);
      }
    
    componentDidMount() {
        this.props.context.data.courseDetails(`${this.props.match.params.id}`)
        .then(res => res.json())
        .then(
        (result) => {
          if(result.id) {
            this.setState({
                errors: null,
                isLoaded: true,
                id: result.id,
                title: result.title,
                description: result.description,
                estimatedTime: result.estimatedTime,
                materialsNeeded: result.materialsNeeded,
                userId: result.User.id,
                userInfo: {
                    fistName: result.User.firstName,
                    lastName: result.User.lastName,
                }
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

    handleFormInputChange(e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: value
        });
    }

    submit() {
        const {context} = this.props;
        const {id,
            title,
            description,
            estimatedTime,
            materialsNeeded,
            userId,} = this.state;
        const course = {
            id,
            title,
            description,
            estimatedTime,
            materialsNeeded,
            userId,
        };

        context.data.courseUpdate(id, course)
            .then(errors => {
                if (errors.length) {
                    this.setState({
                        errors: errors,
                    })
                } else {
                    // Auto sign in after sign up
                    this.props.history.push(`/courses/${id}`);
                }
            })
            .catch( err => {
                console.log(err);
                this.props.history.push('../../error');
            })
    }

    cancel(e) {
        // Link to homepage by pushing home path to the top of the react router history object
        this.props.history.push(`/courses/${this.state.id}`);
    }

    render() {
        if (!this.state.isLoaded) {
            return (
              <div className="bounds">
                <Loading />
              </div>
            )
        } else {
            return(
                <Form 
                    formTitle="Update Course"
                    courseInfo={this.state}
                    inputChange={this.handleFormInputChange}
                    submitText="Update Course"
                    submit={this.submit}
                    cancel={this.cancel} />
            )
        }
    }
}