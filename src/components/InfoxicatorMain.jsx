import React from 'react';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import { ParallaxProvider } from 'react-scroll-parallax';
import { withRouter } from '@americanexpress/one-app-router';
import reducer, { REQUEST, SUCCESS, FAILURE } from '../duck';
import FeaturedPosts from './FeaturedPosts';
import LoadingSkeleton from './LoadingSkeleton';
import '../App.scss';
import HeroImage from './HeroImage';

const InfoxicatorMain = ({
  moduleState, postTitle, router: { location: { pathname } },
}) => {
  const { isLoading, error, posts } = moduleState;
  if (isLoading && posts.length === 0) return <LoadingSkeleton />;
  if (error) return <h1>Something went wrong...</h1>;
  return (
    <React.Fragment>
      <ParallaxProvider> { !postTitle && <HeroImage /> }</ParallaxProvider>
      <Container fluid="md" className="mt-5">
        <FeaturedPosts posts={posts} postTitle={postTitle} filter={pathname.replace(/\//g, '')} />
      </Container>
    </React.Fragment>
  );
};

const loadModuleData = async ({ store: { dispatch, getState }, fetchClient }) => {
  const apiUrl = 'https://www.infoxication.net/wp-json/wp/v2/posts/';
  // const moduleState = getState().getIn(['modules', 'infoxicator-main']);
  // if (moduleState.get('isComplete') && moduleState.get('posts')) {
  //   return;
  // }
  try {
    dispatch({ type: REQUEST });
    const response = await fetchClient(apiUrl);
    const posts = await response.json();
    dispatch({
      type: SUCCESS,
      posts,
    });
  } catch (err) {
    dispatch({
      type: FAILURE,
      error: err,
    });
  }
};


InfoxicatorMain.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object),
};

InfoxicatorMain.defaultProps = { posts: [] };

InfoxicatorMain.holocron = {
  name: 'infoxicator-main',
  reducer,
  loadModuleData,
};

export default withRouter(InfoxicatorMain);
