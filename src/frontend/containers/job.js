import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { sites } from '../components/header';

class Job extends Component {
  getInnerHTML() {
    return { __html: this.props.job.description };
  }

  render() {
    return (
      <div className="section col-md-6">
        <section className="jobDetails">
          <h3>Details:</h3>
          <h2 className="company">{ this.props.job.company }</h2>
          <p className="title">{ this.props.job.title }</p>
          <div dangerouslySetInnerHTML={ this.getInnerHTML() } />
        </section>
      </div>
    );
  }
}

function mapStateToProps( state ) {
  return {
    job: state.selectedJob
  };
}

export default connect(mapStateToProps)(Job);
