import React from 'react';

export default function NotFound(props) {
    return(
        <div className="bounds">
            <h1>Not Found</h1>
            { props.message ?
                <p>{props.message}</p>
                :
                <p>Oh oh! We can not find the page you are looking for.</p>
            }
        </div>
    )
}