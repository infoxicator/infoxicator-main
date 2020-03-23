import React from 'react';
import { compose } from 'redux';
import { holocronModule } from 'holocron';
import { configureIguazuSSR } from 'iguazu-holocron';
import { connectAsync } from 'iguazu';
import PropTypes from 'prop-types';
import { queryProcedureResult } from 'iguazu-rpc';
import { Link } from '@americanexpress/one-app-router';
import reducer from '../duck';
import BlogPost from './BlogPost';

const InfoxicatorMain = ({ isLoading, loadedWithErrors, posts}) => {
  if (isLoading()) return <div className="button is-loading">Loading</div>;
  if (loadedWithErrors()) return <h1>Something went wrong...</h1>;
  return (
    <div className="container is-fluid">
      <ul style={{ marginTop: '1rem' }}>
        {posts.map(
          (post) => <li key={post.id}><Link to={post.slug}><BlogPost post={post} /></Link></li>)}
      </ul>
    </div>
  );
};

function loadDataAsProps({ store: { dispatch } }) {
  const apiUrl = 'http://www.infoxication.net/wp-json/wp/v2/posts/';
  return {
    posts: () => dispatch(queryProcedureResult({ procedureName: 'readPosts', args: { api: apiUrl } })),
  };
}

loadDataAsProps.ssr = true;
InfoxicatorMain.loadDataAsProps = loadDataAsProps;

if (!global.BROWSER) {
  InfoxicatorMain.loadModuleData = configureIguazuSSR;
}

InfoxicatorMain.propTypes = {
  isLoading: PropTypes.func.isRequired,
  loadedWithErrors: PropTypes.func.isRequired,
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default compose(
  connectAsync({ loadDataAsProps }),
  holocronModule({
    name: 'infoxicator-main',
    reducer,
  })
)(InfoxicatorMain);
