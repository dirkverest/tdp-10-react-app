import React from 'react';
import { Redirect } from 'react-router-dom';

// Auto executing function to execute context function without error
export default ({context}) => {
    context.actions.signOut();   
    return(
        <Redirect to="/" />
    );
}