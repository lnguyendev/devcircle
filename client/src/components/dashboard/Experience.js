import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

import { deleteExperience } from '../../actions/profileActions';

class Experience extends Component {
  onDeleteClick(id) {
    this.props.deleteExperience(id);
  }

  render() {
    const experience = this.props.experience.map(exp => (
      <div className="card border-light bg-light mb-3" key={exp._id}>
        <div className="card-header">
          <div className="row">
            <div className="col-md-6">
              <h5 className="card-title mb-0">{exp.company}</h5>
            </div>
            <div className="col-md-6 text-right">{exp.location}</div>
          </div>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-6">
              <h5 className="card-title">{exp.title}</h5>
            </div>
            <div className="col-md-6 text-right">
              <h6 className="card-title">
                <Moment format="MM/DD/YYYY">{exp.from}</Moment> -{' '}
                {exp.current ? (
                  'Now'
                ) : (
                  <Moment format="MM/DD/YYYY">{exp.to}</Moment>
                )}
              </h6>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <p className="card-text">{exp.description}</p>
            </div>
          </div>
          <div className="row text-right">
            <div className="col-md-12">
              <button
                onClick={this.onDeleteClick.bind(this, exp._id)}
                className="btn btn-sm btn-danger"
              >
                <i className="fas fa-trash-alt" />
              </button>
            </div>
          </div>
        </div>
      </div>
    ));

    return (
      <div>
        {this.props.experience.length > 0 ? (
          <h4 className="mb-4">Experiences</h4>
        ) : (
          ''
        )}
        {experience}
      </div>
    );
  }
}

Experience.propTypes = {
  deleteExperience: PropTypes.func.isRequired,
  experience: PropTypes.array.isRequired
};

export default connect(
  null,
  { deleteExperience }
)(Experience);
