import React from 'react'
import { Link } from '@reach/router';

export default function Project({ project }) {
  return (
    <li>
      <h2>Project Name: {project.projectname}</h2>
      <p>Issues: {project.issues.length}</p>
      {
        project.issues.length === 0 ? null :   
        <Link to={`/api/issues/${project.projectname}/details`}> Details of all issues </Link>
      }
      <Link to={`api/issues/${project.projectname}/new`} > Open a new Issue </Link>
    </li>
  )
}
