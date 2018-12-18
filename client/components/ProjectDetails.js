import React, { Component } from 'react'

export default class ProjectDetails extends Component {
  state = {
    issues: []
  }

  componentDidMount() {
    fetch(`/api/issues/${this.props.project}`)
      .then(res => res.json())
      .then(data => this.setState({ issues: data.issues }));
  }


  render () {
    const { project } = this.props;
    return (
      <div>
        Project details here for {project}
        {
            this.state.issues.map(issue => (
              <div key={issue._id}>
                <h1>Title: {issue.issue_title}</h1>
                <p>{issue.issue_text}</p>
                <h4>Issue Status: {issue.open ? 'Open': 'Closed'}</h4>
                <p>Created by: {issue.created_by}</p>
                <p>Created on: {issue.created_on}</p>
                {issue.assigned_to && <p>Assigned To: {issue.assigned_to}</p>}
                {issue.issue_status && <p>Status Text: {issue.status_text}</p>}
                <button>Update Issue</button>
                <button>Delete Issue</button>
              </div>
            ))
        }
      </div>
    )
  }
}
