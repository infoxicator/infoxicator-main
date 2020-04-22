/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';
import FeaturedPost from './FeaturedPost';

const BlogPost = ({ posts, postTitle }) => (
  <React.Fragment>
    { postTitle && (<h2 className="title">{ postTitle }</h2>)}
    <ul className="list-unstyled">
      {posts.map((post) => (
        <FeaturedPost key={post.id} post={post} />
      ))}
    </ul>
  </React.Fragment>
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
