import React from 'react';
import { StyledProjectCard } from '../styles';

export default function ProjectCard({project}){
    return (
        <StyledProjectCard style={project.completed ? {"background": "#cfffd8"} : {"background": "#ffdcdc"}}>
           <h2>{project.name}</h2>
           <p>{project.description}</p>
           <button>Mark Complete</button>
           <button>Go to Project</button>
           {console.log(project)}
        </StyledProjectCard>
    );
}