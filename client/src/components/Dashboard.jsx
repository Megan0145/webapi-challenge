import React from 'react';
import ProjectCard from './ProjectCard';

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
                        <ProjectCard key={project.id} project={project}/>
                    )
                })
            }
        </div>
    );
}