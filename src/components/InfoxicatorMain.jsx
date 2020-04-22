import React from 'react';
import { configureIguazuSSR } from 'iguazu-holocron';
import { connectAsync } from 'iguazu';
import PropTypes from 'prop-types';
import { queryProcedureResult } from 'iguazu-rpc';
import reducer from '../duck';
import FeaturedPosts from './FeaturedPosts';
import LoadingSkeleton from './LoadingSkeleton';
import '../App.scss';

const InfoxicatorMain = ({
  isLoading, loadedWithErrors, posts, postTitle,
}) => {
  if (isLoading()) return <LoadingSkeleton />;
  if (loadedWithErrors()) return <h1>Something went wrong...</h1>;
  return (
    <FeaturedPosts posts={posts} postTitle={postTitle} />
  );
};

function loadDataAsProps({ store: { dispatch } }) {
  const apiUrl = 'https://www.infoxication.net/wp-json/wp/v2/posts/';
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
  posts: PropTypes.arrayOf(PropTypes.object),
};

InfoxicatorMain.defaultProps = { posts: [] };

InfoxicatorMain.holocron = {
  name: 'infoxicator-main',
  reducer,
};

export default connectAsync({ loadDataAsProps })(InfoxicatorMain);
