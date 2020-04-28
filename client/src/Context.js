import React, { Component } from 'react';
import Cookies from 'js-cookie';
import Data from './Data';

const UserContext = React.createContext();


// Provider Component
export class Provider extends Component {

    constructor(props) {
        super(props);
        this.state = {
            authenticatedUser: Cookies.getJSON('authenticatedUser') || false,
        };
        this.data = new Data();
        this.signIn = this.signIn.bind(this);
        this.signOut = this.signOut.bind(this);
    }

    // Sign In & Set Cookie
    async signIn(username, password) {
        const response = await this.data.getUser(username, password);
        // Check for errors and return error response object
        if (response !== null) {
            if (response.ERROR) {
                return response;
            }
            console.log(response);
            // Set state, Set Cookie and return user response object
            this.setState({ 
                authenticatedUser: response,
            });
            Cookies.set('authenticatedUser', JSON.stringify(response), { expires: 1 });
            return response;
        }
    }
    
    // Sign Out & Remove Cookie
    signOut() {
        this.setState({
            authenticatedUser: null,
        });
        Cookies.remove('authenticatedUser');
        Cookies.remove('creds');
    }

    // RENDER PROVIDER COMPONENT
    render() {
        const {authenticatedUser} = this.state;
        const value = {
            authenticatedUser,
            data: this.data,
            actions: {
                signIn: this.signIn,
                signOut: this.signOut,
            }
        };

        return(
            <UserContext.Provider value={value}>
                {this.props.children}
            </UserContext.Provider>
        )
    }

}


// Consumer Component
export const Consumer = UserContext.Consumer;

// Higher lever component returning Component wrapped in Context Consumer
export default function withContext(Component) {
    return function ContextComponent(props) {
        return (
            <UserContext.Consumer>
                {context => <Component {...props} context={context} />}
            </UserContext.Consumer>
        );
    }
}

