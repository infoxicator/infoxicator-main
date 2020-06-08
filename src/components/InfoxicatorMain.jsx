import React from 'react';
import { connectAsync } from 'iguazu';
import Container from 'react-bootstrap/Container';
import { ParallaxProvider } from 'react-scroll-parallax';
import { configureIguazuSSR, queryModuleWithData } from 'iguazu-holocron';
import HeroImage from './HeroImage';

const InfoxicatorMain = ({ isLoading, loadedWithErrors, PostsList }) => {
  if (isLoading()) return <h1>Loading...</h1>;
  if (loadedWithErrors()) return <h1>Something went wrong...</h1>;
  return (
    <React.Fragment>
      <ParallaxProvider><HeroImage /></ParallaxProvider>
      <Container fluid="md" className="mt-5">
        {PostsList && <PostsList /> }
      </Container>
    </React.Fragment>
  );
};

const loadDataAsProps = ({ store: { dispatch } }) => ({
  PostsList: () => dispatch(queryModuleWithData('infoxicator-posts')),
});

loadDataAsProps.ssr = true;
InfoxicatorMain.loadDataAsProps = loadDataAsProps;

if (!global.BROWSER) {
  InfoxicatorMain.loadModuleData = configureIguazuSSR;
}

InfoxicatorMain.holocron = {
  name: 'infoxicator-main',
};

export default connectAsync({ loadDataAsProps })(InfoxicatorMain);
