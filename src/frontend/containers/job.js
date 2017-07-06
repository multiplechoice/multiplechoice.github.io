import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { sites } from '../components/header';

class Job extends Component {
  getInnerHTML() {
    return { __html: this.props.job.description };
  }

  render() {
    if (!this.props.job) {
      return <div></div>
    }
    return (
      <div className="section col-md-6">
        <h4 className="company">{ this.props.job.company }</h4>
        <p className="title">{ this.props.job.title }</p>
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">Job Description</h3>
          </div>
          <div className="panel-body"
            dangerouslySetInnerHTML={ this.getInnerHTML() } />
        </div>
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
