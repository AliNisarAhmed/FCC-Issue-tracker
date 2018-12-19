import React, { Component } from 'react'
import axios from 'axios';
import { navigate } from '@reach/router';

export default class NewIssue extends Component {

  state = {
    issue_title: '',
    issue_text: '',
    created_by: '',
    assigned_to: '',
    status_text: ''
  }

  onChangeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onFormSubmit = (e) => {
    e.preventDefault();
    axios.post(`/api/issues/${this.props.project}`, {
      issue_title: this.state.issue_title,
      issue_text: this.state.issue_text,
      created_by: this.state.created_by,
      assigned_to: this.state.assigned_to,
      status_text: this.state.status_text
    })
    .then(res => {
      console.log(res);
      navigate(`/api/issues/${this.props.project}/details`)
    })
    .catch(e => console.error(e));
  }

  render() {
    return (
      <div className="formContainer">
        <form onSubmit={this.onFormSubmit}>
          <label>Title: </label>
          <input type="text" placeholder="*Title" value={this.state.title} name="issue_title" onChange={this.onChangeHandler} required/><br />
          <label>Text: </label>
          <input type="text" placeholder="*Text" value={this.state.issue_text} name="issue_text" onChange={this.onChangeHandler}/><br />
          <label>Created By: </label>
          <input type="text" placeholder="*Created By" value={this.state.created_by} name="created_by" onChange={this.onChangeHandler}/><br />
          <label>Assigned To: </label>
          <input type="text" placeholder="(opt)Assigned To" value={this.state.assigned_to} name="assigned_to" onChange={this.onChangeHandler}/><br />
          <label>Status: </label>
          <input type="text" placeholder="(opt)Status" value={this.state.status_text} name="status_text" onChange={this.onChangeHandler}/><br />
          <input className="btn" type="submit" value="Submit"/>
        </form>
      </div>
    )
  }
}
