import React, { useEffect, useState } from "react";
import {  BrowserRouter as Router } from 'react-router-dom';
import axios from "axios";
import Navbar from './components/Navbar';
import { StyledAppContainer } from './styles';

function App() {
  const [projects, setProjects] = useState(null)

  useEffect(() => {
    axios
      .get("https://node-1-sprint.herokuapp.com/api/projects")
      .then(res => {
        setProjects(res.data)
      })
      .catch(err => {
        console.log(err);
      });
  }, []);
  return (
    <Router>
      <StyledAppContainer>
      <Navbar projects={projects} />
      </StyledAppContainer>
    </Router>
  );
}

export default App;
