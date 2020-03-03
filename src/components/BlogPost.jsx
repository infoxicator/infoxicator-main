import React from 'react';

const BlogPost = ({ post }) => (
  <div className="card">
    <div className="card-image" />
    <div className="card-content">
      <div className="media">
        <div className="media-left" />
        <div className="media-content">
          <p className="title is-4">{post.title.rendered}</p>
          <p className="subtitle is-6">{post.date}</p>
        </div>
      </div>
    </div>
  </div>
);

export default BlogPost;
