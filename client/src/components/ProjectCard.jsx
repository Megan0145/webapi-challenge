import React from 'react';

export default function ProjectCard({project}){
    return (
        <div>
           <h2>{project.name}</h2>
           <p>{project.description}</p>
           <p>Completed: {project.completed ? "Yes" : "No"}</p>
           {console.log(project)}
        </div>
    );
}