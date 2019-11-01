import React from 'react';
import {Link, Route} from 'react-router-dom';
import Dashboard from './Dashboard';

export default function Navbar(props){
    const { projects } = props;
    return(
        <div>
           <nav>
               <Link to='/'>Home</Link>
           </nav>
           <main>
               <Route exact path='/' render={props => {return <Dashboard projects={projects}/>}} />
           </main>
        </div>
    );
}