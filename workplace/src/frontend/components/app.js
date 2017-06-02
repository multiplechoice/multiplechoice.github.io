import React, { Component } from 'react';
import JobsList from '../containers/jobs_list'

export default class App extends Component {
  render() {
    return (
      <div>
        <JobsList />
      </div>
    );
  }
}
