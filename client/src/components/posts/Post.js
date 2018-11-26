import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import { getPost } from '../../actions/postActions';
import { getProfiles, getCurrentProfile } from '../../actions/profileActions';

import isEmpty from '../../validation/is-empty';
import Spinner from '../common/Spinner';
import PostItem from './PostItem';
import CommentForm from './CommentForm';
import CommentFeed from './CommentFeed';

class Post extends Component {
  componentWillMount() {
    this.props.getCurrentProfile();

    const { profile } = this.props.profile;

    if (_.isEmpty(profile)) {
      this.props.history.push('/dashboard');
    }
  }
  componentDidMount() {
    this.props.getPost(this.props.match.params.id);
    this.props.getProfiles();
  }

  findProfile(profiles, post) {
    return _.find(profiles, profile => profile.user._id === post.user) || {};
  }

  render() {
    const { post, loading } = this.props.post;
    const { profiles } = this.props.profile;
    let postContent;

    if (post === null || loading || isEmpty(post)) {
      postContent = <Spinner />;
    } else {
      postContent = (
        <div>
          <PostItem
            post={post}
            showActions={false}
            profile={this.findProfile(profiles, post)}
          />
          <CommentForm postId={post._id} />
          <CommentFeed
            postId={post._id}
            comments={post.comments}
            profiles={profiles || []}
          />
        </div>
      );
    }

    return (
      <div className="post">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Link to="/feed" className="btn btn-light mb-3">
                Back To Feed
              </Link>
              {postContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Post.proptypes = {
  getPost: PropTypes.func.isRequired,
  getProfiles: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getPost, getProfiles, getCurrentProfile }
)(Post);
