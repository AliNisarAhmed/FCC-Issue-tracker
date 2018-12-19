import React, { Component } from 'react'
import Axios from 'axios';
import { navigate } from '@reach/router';

export default class UpdateIssue extends Component {
  
  state = {
    assigned_to: '',
    status_text: '',
    open: true,
    issue_title: '',
    issue_text: ''
  }

  componentDidMount() {
    this.getIssue();
  }

  getIssue = async () => {
    let issue = await Axios.get(`/api/issues/${this.props.project}/${this.props.issue_id}`);
    let {
      assigned_to,
      status_text,
      open,
      issue_title,
      issue_text
    } = issue.data;
    this.setState({assigned_to, status_text, open, issue_title, issue_text});
  }


  onChangeHandler = (e) => {
    let value = e.target.type === "checkbox" ? !e.target.checked : e.target.value;  // for checkbox, e.target.checkbox must be reversed, else the checkbox will not work
    this.setState({
      [e.target.name]: value
    })
  }

  onFormSubmit = (e) => {
    e.preventDefault();
    Axios.put(`/api/issues/${this.props.project}`, {
      _id: this.props.issue_id,
      issue_title: this.state.issue_title,
      issue_text: this.state.issue_text,
      assigned_to: this.state.assigned_to,
      status_text: this.state.status_text,
      open: this.state.open
    },
    {headers: {"Content-Type": "application/json"}}
    )
    .then(res => {
      navigate(`/api/issues/${this.props.project}/details`)
    })
    .catch(e => console.error(e));
  }

  render() {
    return (
      <div className="formContainer">
        <form onSubmit={this.onFormSubmit}>
          <label>Title </label>
          <input type="text" placeholder="*Title" value={this.state.issue_title} name="issue_title" onChange={this.onChangeHandler} required/><br />

          <label>Text </label>
          <input type="text" placeholder="*Text" value={this.state.issue_text} name="issue_text" onChange={this.onChangeHandler}/><br />

          <label>Status: </label>
          <input type="text" placeholder="Status" value={this.state.status_text} name="status_text" onChange={this.onChangeHandler}/><br />
          

          <label>Assigned To: </label>
          <input type="text" placeholder="Assigned To" value={this.state.assigned_to} name="assigned_to" onChange={this.onChangeHandler}/><br />
          
          <label>Mark Issue as closed:
            <input type="checkbox" name="open" checked={!this.state.open} onChange={this.onChangeHandler} />
          </label>
          <input type="submit" value="Submit" className="btn"/>
        </form>
      </div>
    )
  }
}
