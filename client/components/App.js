import React, { Component } from 'react'
import { Router, Link } from '@reach/router';

import ProjectList from './ProjectList';
import NewIssue from './NewIssue';
import ProjectDetails from './ProjectDetails';
import NewProject from './NewProject';

export default class App extends Component {
  
  state = {
    projects: [],
  }

  componentDidMount() {
    this.getProjects();
  }

  getProjects = async () => {
    let res = await fetch('/projects');
    let projects = await res.json();
    console.log(projects);
    this.setState({projects});
  }

  
  render() {
    return (
      <div>
        <h1><Link to="/" >Issue Tracker</Link></h1>
        <Router>
          <ProjectList path="/" projects={this.state.projects} />
          <ProjectDetails path="/api/issues/:project/details" />
          <NewIssue path="/api/issues/:project/new" />
          <NewProject path="/projects/new" />
        </Router>
      </div>
    )
  }
}
