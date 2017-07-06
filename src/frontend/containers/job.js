import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { sites } from '../components/header';
import PostedElement from '../components/date';

class Job extends Component {
  getInnerHTML() {
    return { __html: this.props.job.description };
  }

  render() {
    const { job } = this.props;
    if (!job) {
      return <div></div>
    }
    const {
      company,
      title,
      description,
      created_at,
      posted,
      deadline,
      spider,
      url } = job;
    const site = sites[spider]
    const timestamp = sites[spider].accurate ? posted : created_at;

    return (
      <div className="section col-md-7">

        <div className="panel panel-default">
          <div className="panel-body">
            <div>
              <h4 className="title">
                {title}
                <br />
                <small> {company}</small>
              </h4>
              <br />
            </div>
            <div className="text-right">
              <a href={url} target="_blank">
                Seen on {site.name} <PostedElement timestamp={timestamp} />
              </a>
            </div>
          </div>
        </div>

        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">Job Description</h3>
          </div>
          <div className="panel-body" dangerouslySetInnerHTML={ this.getInnerHTML() } />
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
