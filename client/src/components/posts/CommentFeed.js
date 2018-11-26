import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import CommentItem from './CommentItem';

class CommentFeed extends Component {
  findProfile(profiles, comment) {
    return _.find(profiles, profile => profile.user._id === comment.user) || {};
  }

  render() {
    const { comments, postId, profiles } = this.props;

    return comments.map(comment => (
      <CommentItem
        key={comment._id}
        comment={comment}
        postId={postId}
        profile={this.findProfile(profiles, comment)}
      />
    ));
  }
}

CommentFeed.propTypes = {
  comments: PropTypes.array.isRequired,
  postId: PropTypes.string.isRequired,
  profiles: PropTypes.array.isRequired
};

export default CommentFeed;
