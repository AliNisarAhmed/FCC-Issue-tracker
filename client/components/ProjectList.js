import React from 'react'
import Project from './Project';

import { Link } from '@reach/router';


export default function ProjectList({ projects }) {
  return (
    <React.Fragment>
      <Link to="/projects/new">Add a new Project</Link>
      {
        projects.map(project => (
          <React.Fragment>
            <Project project={project} key={project._id} />
          </React.Fragment>
        ))
      }
    </React.Fragment>
  );
}
