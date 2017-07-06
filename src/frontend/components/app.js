import React, { Component } from 'react';
import SearchBar from '../containers/search_bar';
import JobsList from '../containers/jobs_list';
import Job from '../containers/job';

export default class App extends Component {
  render() {
    return (
      <div>
        <div className="row">
          <SearchBar />
        </div>
        <div className="row">
          <JobsList />
          <Job />
        </div>
      </div>
    );
  }
}
