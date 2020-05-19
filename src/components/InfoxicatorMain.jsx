import React from 'react';
import { configureIguazuSSR } from 'iguazu-holocron';
import { connectAsync } from 'iguazu';
import PropTypes from 'prop-types';
import { queryProcedureResult } from 'iguazu-rpc';
import Container from 'react-bootstrap/Container';
import { ParallaxProvider } from 'react-scroll-parallax';
import { withRouter } from '@americanexpress/one-app-router';
import { compose } from 'redux';
import reducer from '../duck';
import FeaturedPosts from './FeaturedPosts';
import LoadingSkeleton from './LoadingSkeleton';
import '../App.scss';
import HeroImage from './HeroImage';

const InfoxicatorMain = ({
  isLoading, loadedWithErrors, posts, postTitle, router: { location: { pathname } },
}) => {
  if (isLoading()) return <LoadingSkeleton />;
  if (loadedWithErrors()) return <h1>Something went wrong...</h1>;
  return (
    <React.Fragment>
      <ParallaxProvider> { !postTitle && <HeroImage /> }</ParallaxProvider>
      <Container fluid="md" className="mt-5">
        <FeaturedPosts posts={posts} postTitle={postTitle} filter={pathname.replace(/\//g, '')} />
      </Container>
    </React.Fragment>
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

export default compose(
  connectAsync({ loadDataAsProps }),
  withRouter
)(InfoxicatorMain);
