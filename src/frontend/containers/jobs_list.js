import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';

import { fetchJobs } from '../actions';
import { sites } from '../components/header';

class JobsList extends Component {
  componentDidMount() {
    this.props.fetchJobs();
  }

  renderListItem(item) {
    const { company, title, posted, deadline, spider, url } = item;
    const m = moment(posted);
    return (
      <li key={_.uniqueId()} className="job">
        <a href={url} target="_blank">
          <h2 className="company">{company}</h2>
          <p className="title">{title}</p>
          <date className="posted-at" title={m.format("Do MMMM YYYY")}>
            {m.fromNow()}
            <i className="material-icons md-18">access_time</i>
          </date>
          <span className="source">
            {sites[spider].name}
            <i className="material-icons md-18">link</i>
          </span>
        </a>
      </li>
    );
  }

  filterJob(job, term) {
    const search_term = term.toLowerCase();
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
    let { term, jobs } = this.props;
    if (term) {
      jobs = jobs.filter((job) => this.filterJob(job, term));
    };
    jobs = _.reverse(_.sortBy(jobs, ['posted', 'spider']));

    return (
      <section className="jobs">
        <ul>
          { jobs.map(this.renderListItem) }
        </ul>
      </section>
    );
  }
}

function mapStateToProps({ jobs, term }) {
  return { jobs: jobs, term: term };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchJobs }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(JobsList);
