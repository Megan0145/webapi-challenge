import React from 'react';

export default function Dashboard(props) {
    const { projects } = props;

    if(!projects){
        return <p>Loading...</p>
    } 
    return(
        <div>
            Dashboard
            {
                projects.map(project => {
                    return(
                        <div>{project.name}</div>
                    )
                })
            }
        </div>
    );
}