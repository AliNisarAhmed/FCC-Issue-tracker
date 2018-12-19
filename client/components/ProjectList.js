import React from 'react'
import Project from './Project';

import { Link } from '@reach/router';

export default class ProjectList extends React.Component {

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
      <React.Fragment>
        <Link className="btn" to="/projects/new">Add a new Project</Link>
        <div id="projectList">
          {
            this.state.projects.map(project => (
              <Project project={project} key={project._id} />
            ))
          }
        </div>
      </React.Fragment>
    );
  }
}
