import React, { Component } from 'react'
import { Router, Link } from '@reach/router';

import ProjectList from './ProjectList';
import NewIssue from './NewIssue';
import ProjectDetails from './ProjectDetails';
import NewProject from './NewProject';
import UpdateIssue from './UpdateIssue';

export default function App () {  
  return (
    <div id="main">
      <h1 id="title"><Link to="/" >Issue Tracker</Link></h1>
      <div id="container">
        <Router>
          <ProjectList path="/" />
          <ProjectDetails path="/api/issues/:project/details" />
          <NewIssue path="/api/issues/:project/new" />
          <NewProject path="/projects/new" />
          <UpdateIssue path="/api/issues/:project/:issue_id/update" />
        </Router>
      </div>
    </div>
  )
}

