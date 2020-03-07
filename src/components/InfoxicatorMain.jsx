import React from 'react';
import { holocronModule } from 'holocron';
import PropTypes from 'prop-types';
import { Link } from '@americanexpress/one-app-router';
import reducer, { REQUEST, SUCCESS, FAILURE } from '../duck';
import BlogPost from './BlogPost';

const InfoxicatorMain = ({ moduleState }) => {
  if (moduleState.isLoading) return <div className="button is-loading">Loading</div>;
  if (moduleState.error) return <h1>Something went wrong...</h1>;
  return (
    <div className="container is-fluid">
      <ul style={{ marginTop: '1rem' }}>
        {moduleState.data.posts.map(
          (post) => <li key={post.id}><Link to={post.slug}><BlogPost post={post} /></Link></li>)}
      </ul>
    </div>
  );
};
InfoxicatorMain.loadModuleData = async ({ store, fetchClient }) => {
  store.dispatch({ type: REQUEST });
  try {
    const fastRes = await fetchClient('http://www.infoxication.net/wp-json/wp/v2/posts/');
    const posts = await fastRes.json();
    store.dispatch({
      type: SUCCESS,
      data: {
        posts,
      },
    });
  } catch (err) {
    store.dispatch({
      type: FAILURE,
      error: err,
    });
  }
};

InfoxicatorMain.propTypes = {
  moduleState: PropTypes.shape({
    isLoading: PropTypes.bool.isRequired,
    isComplete: PropTypes.bool.isRequired,
    data: PropTypes.shape({ posts: PropTypes.array }),
    error: PropTypes.shape({}),
  }).isRequired,
};

export default holocronModule({
  name: 'infoxicator-main',
  reducer,
})(InfoxicatorMain);
