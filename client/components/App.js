import React, { Component } from 'react'
import { Router, Link } from '@reach/router';

import Issues from './Issues';
import NewIssue from './NewIssue';

export default class App extends Component {
  
  state = {
    projects: null,
  }

  componentDidMount() {
    console.log('here');
    fetch('/projects')
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.setState({projects: data});
      })
  }
  
  render() {
    return (
      <div>
        <Router>
          <Issues path="/api/issues/:project/issues" />
          <NewIssue path="/api/issues/:project/new" />
        </Router>
        <h1>Projects: </h1>
        <ul>
          {
            this.state.projects &&
            this.state.projects.map(project => (
              <li>
                <p>Project Name: <span>{project.projectname}</span></p>
                <p>Issues: {project.issues.length}</p>
                  <Link to={`/api/issues/${project.projectname}/issues`}>See Issues</Link>
                  <Link to={`api/issues/${project.projectname}/new`}>Create new Issue</Link>
              </li>
            ))
          }
        </ul>
      </div>
    )
  }
}
