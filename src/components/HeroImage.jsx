import React from 'react';
import Image from 'react-bootstrap/Image';
import { Parallax } from 'react-scroll-parallax';
import style from './Hero.scss';

const HeroImage = () => (
  <div className={style.root}>
    <p className={style.scroll}>Microfrontends Unleashed</p>
    <div className={style.container}>
      <Parallax className="custom-class" y={[-25, 25]} tagOuter="figure">
        <Image className={style.holocron} src="https://www.infoxication.net/wp-content/uploads/2020/05/holocron.gif" />
      </Parallax>
    </div>
  </div>
);

export default HeroImage;
