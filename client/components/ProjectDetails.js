import React, { Component } from 'react'
import Axios from 'axios';

import { Link, navigate } from '@reach/router';

export default class ProjectDetails extends Component {
  state = {
    issues: []
  }

  componentDidMount() {
    this.getIssues();
  }

  getIssues = () => {
    fetch(`/api/issues/${this.props.project}`)
    .then(res => res.json())
    .then(data => this.setState({ issues: data }));
  }

  handleDelete = async (id) => {
    try {
      let msg = await Axios.delete(`/api/issues/${this.props.project}`, {
        data: {
          _id: id
        },
        headers:{Authorization: "token"},
      });
      console.log(msg);
      this.getIssues();
    } catch (error) {
      console.error(error);
    }
  }


  render () {
    const { project } = this.props;
    console.log(this.state.issues);
    return (
      <div>
        <h1 className="heading-primary">All Issues({this.state.issues.length}) for <span>{project}</span></h1>
        <div id="issueList">
          {
              this.state.issues.map(issue => (
                <div key={issue._id} id="issue">
                  <h2 className="heading-secondary">{issue.issue_title}</h2>
                  <div className="description">
                    <p>{issue.issue_text}</p>
                  </div>
                  <h4 className="heading-tertiary">Issue Status: <span>{issue.open ? 'Open': 'Closed'}</span></h4>
                  <p>Project: <span>{this.props.project}</span></p>
                  <p>Created by: <span>{issue.created_by}</span></p>
                  <p>Created on: <span>{(new Date(issue.created_on)).toLocaleString()}</span></p>
                  {issue.assigned_to && <p>Assigned To: <span>{issue.assigned_to}</span></p>}
                  {issue.issue_status && <p>Status Text: <span>{issue.status_text}</span></p>}
                  <p>Last updated on {(new Date(issue.updated_on)).toLocaleString()}</p>
                  <Link className="btn update" to={`/api/issues/${this.props.project}/${issue._id}/update`}>Update</Link>
                  <a className="btn" onClick={() => this.handleDelete(issue._id)}>Delete</a>
                </div>
              ))
          }
        </div>
      </div>
    )
  }
}
