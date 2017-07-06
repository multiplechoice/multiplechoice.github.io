import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';

import { fetchJobs, selectJob } from '../actions/index';
import { sites } from '../components/header';

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
    const m = sites[spider].accurate ? moment(posted) : moment(created_at);

    return (
      <a href="#"
        className="job-list-entry list-group-item"
        key={_.uniqueId()}
        onClick={() => this.props.selectJob(item)}>
        <div className="row">
          <div className="col-md-9">
            <h4 className="company list-group-item-heading">{company}</h4>
            <p className="title list-group-item-text">{title}</p>
          </div>
          <div className="col-md-3 text-right">
            <date className="posted-at" title={m.format("MMMM Do YYYY, h:mm:ss a")}>
              {m.fromNow()}
            </date>
          </div>
        </div>
      </a>
    );
  }

  filterJob(job, searchTerm) {
    const search_term = searchTerm.toLowerCase();
    const { company, title } = job;

    // sometimes the fields are null (more the company than title though)
    if (company != null && company.toLowerCase().includes(search_term)) {
      return true;
    }
    if (title != null && title.toLowerCase().includes(search_term)) {
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
      <div className="section col-md-6">
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
