import React from 'react';
import {Link, Route} from 'react-router-dom';
import Dashboard from './Dashboard';
import { StyledNav } from '../styles';

export default function Navbar(props){
    const { projects } = props;
    return(
        <div>
           <StyledNav>
               <Link to='/'>Home</Link>
               <Link to='/addproject'>Add a Project</Link>
           </StyledNav>
           <main>
               <Route exact path='/' render={props => {return <Dashboard projects={projects}/>}} />
           </main>
        </div>
    );
}