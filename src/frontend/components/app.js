import React, { Component } from 'react';
import SearchBar from '../containers/search_bar';
import JobsList from '../containers/jobs_list';

export default class App extends Component {
  render() {
    return (
      <div>
        <SearchBar />
        <JobsList />
      </div>
    );
  }
}
