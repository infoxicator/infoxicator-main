/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import FeaturedPost from './FeaturedPost';

const BlogPost = ({ posts, hideImage }) => (
  <Grid container={true} spacing={4}>
    {posts.map((post) => (
      <FeaturedPost key={post.id} post={post} hideImage={hideImage} />
    ))}
  </Grid>
);

BlogPost.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.shape({ rendered: PropTypes.string }),
    date: PropTypes.string,
    excerpt: PropTypes.shape({ rendered: PropTypes.string }),
    better_featured_image: PropTypes.shape({ source_url: PropTypes.string }),
  }).isRequired,
};

export default BlogPost;
