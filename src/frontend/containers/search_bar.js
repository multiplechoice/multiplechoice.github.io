import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { searchJobs } from '../actions/index';

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = { term: '' };

    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onInputChange(event) {
    this.setState({ term: event.target.value });
  }

  onFormSubmit(event) {
    event.preventDefault();

    this.props.searchJobs(this.state.term);
    // this.setState({ term: '' });
  }

  render() {
    return (
      <div className="col-md-6 col-md-offset-3">
        <form onSubmit={this.onFormSubmit}>
          <div className="form-group">
            <input
              placeholder="Company, position..."
              className="form-control"
              value={this.state.term}
              onChange={this.onInputChange} />
          </div>
        </form>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ searchJobs }, dispatch);
}

export default connect(null, mapDispatchToProps)(SearchBar);
