import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { Link } from 'react-router-dom';

import { deletePost, addOrRemoveLike } from '../../actions/postActions';

class PostItem extends Component {
  onDeleteClick(id) {
    this.props.deletePost(id);
  }

  handleLikeClick(id) {
    this.props.addOrRemoveLike(id);
  }

  findUserLike(likes) {
    const { auth } = this.props;

    return likes.filter(like => like.user === auth.user.id).length > 0;
  }

  render() {
    const { post, auth, showActions, profile } = this.props;

    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-3">
            <Link
              to={
                profile && profile.handle
                  ? `/profile/${profile.handle}`
                  : '/not-found'
              }
            >
              <img
                className="rounded-circle d-none d-md-block"
                src={post.avatar}
                alt={post.name}
              />
            </Link>
            <br />
            <p className="text-center">{post.name}</p>
          </div>
          <div className="col-md-9">
            <p className="lead">{post.text}</p>
            {showActions ? (
              <span>
                <button
                  onClick={this.handleLikeClick.bind(this, post._id)}
                  type="button"
                  className="btn btn-light mr-1"
                >
                  <i
                    className={classnames('fas fa-thumbs-up', {
                      'text-info': this.findUserLike(post.likes)
                    })}
                  />
                  <span className="badge badge-light">{post.likes.length}</span>
                </button>
                <Link to={`/post/${post._id}`} className="btn btn-info mr-1">
                  Comments
                </Link>
                {post.user === auth.user.id ? (
                  <button
                    onClick={this.onDeleteClick.bind(this, post._id)}
                    type="button"
                    className="btn btn-danger mr-1"
                  >
                    <i className="fas fa-times" />
                  </button>
                ) : null}
              </span>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

PostItem.defaultProps = {
  showActions: true
};

PostItem.propTypes = {
  deletePost: PropTypes.func.isRequired,
  addOrRemoveLike: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deletePost, addOrRemoveLike }
)(PostItem);
