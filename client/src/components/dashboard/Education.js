import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

import { deleteEducation } from '../../actions/profileActions';

class Education extends Component {
  onDeleteClick(id) {
    this.props.deleteEducation(id);
  }

  render() {
    const education = this.props.education.map(edu => (
      <div className="card border-light bg-light mb-3" key={edu._id}>
        <div className="card-header">
          <div className="row">
            <div className="col-md-6">
              <h5 className="card-title mb-0">{edu.school}</h5>
            </div>
            <div className="col-md-6 text-right">{edu.degree}</div>
          </div>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-6">
              <h5 className="card-title">{edu.fieldofstudy}</h5>
            </div>
            <div className="col-md-6 text-right">
              <h6 className="card-title">
                <Moment format="MM/DD/YYYY">{edu.from}</Moment> -{' '}
                {edu.current ? (
                  'Now'
                ) : (
                  <Moment format="MM/DD/YYYY">{edu.to}</Moment>
                )}
              </h6>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <p className="card-text">{edu.description}</p>
            </div>
          </div>
          <div className="row text-right">
            <div className="col-md-12">
              <button
                onClick={this.onDeleteClick.bind(this, edu._id)}
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
        {this.props.education.length > 0 ? (
          <h4 className="mb-4">Education</h4>
        ) : (
          ''
        )}
        {education}
      </div>
    );
  }
}

Education.propTypes = {
  deleteEducation: PropTypes.func.isRequired,
  education: PropTypes.array.isRequired
};

export default connect(
  null,
  { deleteEducation }
)(Education);
