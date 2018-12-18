import React, { Component } from 'react'
import Axios from 'axios';
import { navigate, redirectTo } from '@reach/router';

export default class NewProject extends Component {

  state = {
    name: ''
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    let data = await Axios.post('/projects/new', {
      projectname: this.state.name,
    })
    console.log(data);
    navigate('/');
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>Name of the Project: </label>
          <input type="text" placeholder="Name" value={this.state.name} onChange={this.handleChange} name="name" required/>
          <input type="submit" value="Submit"/>
        </form>
      </div>
    )
  }
}
