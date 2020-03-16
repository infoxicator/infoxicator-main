/* eslint-disable react/no-danger */
import React from 'react';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';

const createMarkup = (markup) => ({ __html: markup });

const BlogPost = ({ post }) => (
  <div className="box" style={{ marginBottom: '1rem' }}>
    <div className="media">
      {post.better_featured_image && post.better_featured_image.source_url
        && (
        <div className="media-left">
          <figure className="image is-128x128">
            <img src={post.better_featured_image.source_url} alt="post preview" />
          </figure>
        </div>
        )}
      <div className="media-content">
        <p className="title is-3">{post.title.rendered}</p>
        <p className="subtitle is-6">{dayjs(post.date).format('MMMM DD, YYYY')}</p>
        <div dangerouslySetInnerHTML={createMarkup(post.excerpt.rendered)} />
      </div>
    </div>
  </div>
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
