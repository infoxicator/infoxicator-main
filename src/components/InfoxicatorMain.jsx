import React from 'react';
import { holocronModule } from 'holocron';
import PropTypes from 'prop-types';
import reducer, { REQUEST, SUCCESS, FAILURE } from '../duck';
import BlogPost from './BlogPost';

const InfoxicatorMain = ({ moduleState }) => {
  if (moduleState.isLoading) return <h1>Loading...</h1>;
  if (moduleState.error) return <h1>Something went wrong...</h1>;
  return (
    <ul>
      {moduleState.data.posts.map((post) => <li key={post.id}><h1><BlogPost post={post} /></h1></li>)}
    </ul>
  );
};
InfoxicatorMain.loadModuleData = async ({ store, fetchClient }) => {
  store.dispatch({ type: REQUEST });
  try {
    const fastRes = await fetchClient('http://www.infoxication.net/wp-json/wp/v2/posts/');
    const posts = await fastRes.json();
    console.log(posts);
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
    data: PropTypes.shape({}),
    error: PropTypes.shape({}),
  }).isRequired,
};

export default holocronModule({
  name: 'infoxicator-main',
  reducer,
})(InfoxicatorMain);
