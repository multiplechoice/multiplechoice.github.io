import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { sites } from '../components/header';
import PostedElement from '../components/date';

class Job extends Component {
  render() {
    const { job } = this.props;
    if (!job) {
      return <div></div>;
    }

    return (
      <div className="section col-md-7">
        <JobHeader job={job} />
        <JobDescription description={job.description} />
        <JobAdvertisement images={job.images} />
      </div>
    );
  }
}

const JobHeader = ({ job }) => {
  const {
    company,
    title,
    created_at,
    posted,
    spider,
    url } = job;
  const site = sites[spider]
  const timestamp = site.accurate ? posted : created_at;
  return (
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
  );
}

const JobDescription = ({ description }) => {
  // when a job has an empty description it's an empty string
  if ( description.length == 0 ) {
    return <div></div>;
  }

  const html = { __html: description };
  return (
    <div className="panel panel-default">
      <div className="panel-heading">
        <h3 className="panel-title">Description</h3>
      </div>
      <div className="panel-body" dangerouslySetInnerHTML={ html } />
    </div>
  );
}

const JobAdvertisement = ({ images }) => {
  if ( images.length == 0 ) {
    return <div></div>;
  }

  return (
    <div className="panel panel-default">
      <div className="panel-heading">
        <h3 className="panel-title">Advertisement</h3>
      </div>
      <img src={images[0].s3_path} />
    </div>
  );
}

function mapStateToProps( state ) {
  return {
    job: state.selectedJob
  };
}

export default connect(mapStateToProps)(Job);
