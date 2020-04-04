import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@americanexpress/one-app-router';
import reducer, { REQUEST, SUCCESS, FAILURE } from '../duck';
import BlogPost from './BlogPost';

const InfoxicatorMain = ({ moduleState }) => {
  if (moduleState.isLoading) return <div className="button is-loading">Loading</div>;
  if (moduleState.data) {
    return (
      <div className="container is-fluid">
        <ul style={{ marginTop: '1rem' }}>
          {
        moduleState.data.posts.map(
          (post) => <li key={post.id}><Link to={post.slug}><BlogPost post={post} /></Link></li>)
        }
        </ul>
      </div>
    );
  }
  return <h1>Something went wrong...</h1>;
};

const loadModuleData = async ({ store, fetchClient }) => {
  const moduleState = store.getState().getIn(['modules', 'infoxicator-main']);
  // If isComplete and data already exists dont run request again
  if (moduleState.get('isComplete') && moduleState.get('data')) {
    return;
  }
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

InfoxicatorMain.holocron = {
  name: 'infoxicator-main',
  reducer,
  loadModuleData,
};

export default InfoxicatorMain;
