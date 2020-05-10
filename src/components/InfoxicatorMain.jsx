import React from 'react';
import { configureIguazuSSR } from 'iguazu-holocron';
import { connectAsync } from 'iguazu';
import PropTypes from 'prop-types';
import { queryProcedureResult } from 'iguazu-rpc';
import Container from 'react-bootstrap/Container';
import { ParallaxProvider } from 'react-scroll-parallax';
import reducer from '../duck';
import FeaturedPosts from './FeaturedPosts';
import LoadingSkeleton from './LoadingSkeleton';
import '../App.scss';
import HeroImage from './HeroImage';

const InfoxicatorMain = ({
  isLoading, loadedWithErrors, posts, postTitle,
}) => {
  if (isLoading()) return <LoadingSkeleton />;
  if (loadedWithErrors()) return <h1>Something went wrong...</h1>;
  return (
    <main>
      <ParallaxProvider> { !postTitle && <HeroImage /> }</ParallaxProvider>
      <Container fluid="md" className="mt-5">
        <FeaturedPosts posts={posts} postTitle={postTitle} />
      </Container>
    </main>

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
