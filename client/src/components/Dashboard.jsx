import React from 'react';
import ProjectCard from './ProjectCard';
import { StyledDashboard } from '../styles';

export default function Dashboard(props) {
    const { projects } = props;

    if(!projects){
        return <p>Loading...</p>
    } 
    return(
        <StyledDashboard>
            {
                projects.map(project => {
                    return(
                        <ProjectCard key={project.id} project={project}/>
                    )
                })
            }
        </StyledDashboard>
    );
}