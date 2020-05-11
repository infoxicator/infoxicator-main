import React from 'react';
import dayjs from 'dayjs';
import { Link } from '@americanexpress/one-app-router';
import Card from 'react-bootstrap/Card';
import Media from 'react-bootstrap/Media';

const createMarkup = (markup) => ({ __html: markup });

const FeaturedPost = ({ post }) => (
  <li className="py-2">
    <Link to={post.slug} className="deco-none">
      <Card body={true} className="ripple">
        <Media>
          <Media.Body>
            <Card.Title>{post.title.rendered}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{dayjs(post.date).format('MMMM DD, YYYY')}</Card.Subtitle>
            <Card.Text>
              <p dangerouslySetInnerHTML={createMarkup(post.excerpt.rendered)} />
            </Card.Text>
          </Media.Body>
          {post.better_featured_image && post.better_featured_image.media_details.sizes.thumbnail.source_url
          && (
            <div className="d-none d-sm-block">
              <img
                className="ml-3"
                src={post.better_featured_image.media_details.sizes.thumbnail.source_url}
                alt="Generic placeholder"
              />
            </div>
          )}
        </Media>
      </Card>
    </Link>
  </li>
);

export default FeaturedPost;
