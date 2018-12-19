import React from 'react'
import { Link } from '@reach/router';

export default function Project({ project }) {
  return (
    <div id="project">
      <h2 className="heading-secondary"><span>{project.projectname}</span></h2>
      <p>Issues: <span>{project.issues.length}</span></p>
      {
        project.issues.length === 0 ? null :   
        <Link className="btn" to={`/api/issues/${project.projectname}/details`}> Details</Link>
      }
      <Link className="btn newIssue" to={`api/issues/${project.projectname}/new`} >Open a new Issue</Link>
    </div>
  )
}
