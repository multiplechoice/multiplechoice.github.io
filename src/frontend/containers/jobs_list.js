import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchJobs, selectJob } from '../actions/index';
import { sites } from '../components/header';
import PostedElement from '../components/date';

class JobsList extends Component {
  constructor(props) {
    super(props);

    // need to bind the renderListItem method to the instance so that
    // it can invoke this.props.selectJob()
    this.renderListItem = this.renderListItem.bind(this);
  }

  componentDidMount() {
    this.props.fetchJobs();
  }

  renderListItem(item) {
    const { company, title, created_at, posted, deadline, spider, url } = item;
    const site = sites[spider]
    const timestamp = site.accurate ? posted : created_at;

    return (
      <a href="#"
        className="job-list-entry list-group-item"
        key={_.uniqueId()}
        onClick={() => this.props.selectJob(item)}>
        <h4 className="title">
          {title}
          <br />
          <small>{company}</small>
        </h4>
      </a>
    );
  }

  filterJob(job, searchTerm) {
    const search_term = searchTerm.toLowerCase();
    const { company, title, description } = job;

    // sometimes the fields are null (more the company than title though)
    if (company != null && company.toLowerCase().includes(search_term)) {
      return true;
    }
    if (title != null && title.toLowerCase().includes(search_term)) {
      return true;
    }
    if (description != null && description.toLowerCase().includes(search_term)) {
      return true;
    }
    return false;
  }

  render() {
    let { searchTerm, jobs } = this.props;
    if (searchTerm) {
      jobs = jobs.filter((job) => this.filterJob(job, searchTerm));
    };
    jobs = _.reverse(_.sortBy(jobs, item => {
      return sites[item.spider].accurate ? item.posted : item.created_at;
    }));

    return (
      <div className="section col-md-5">
        <div className="list-group">
          { jobs.map(this.renderListItem) }
        </div>
      </div>
    );
  }
}

function mapStateToProps( state ) {
  return { jobs: state.jobs, searchTerm: state.searchTerm };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchJobs: fetchJobs, selectJob: selectJob }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(JobsList);
