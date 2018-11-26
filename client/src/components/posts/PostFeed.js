import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import PostItem from './PostItem';

class PostFeed extends Component {
  render() {
    const { posts, profiles } = this.props;

    return posts.map(post => (
      <PostItem
        key={post._id}
        post={post}
        profile={
          _.find(profiles, profile => profile.user._id === post.user) || {}
        }
      />
    ));
  }
}

PostFeed.propTypes = {
  posts: PropTypes.array.isRequired,
  profiles: PropTypes.array.isRequired
};

export default PostFeed;
