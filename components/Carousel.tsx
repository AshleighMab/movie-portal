import React from 'react';
import { Carousel } from 'antd';
import style from './Carousel.module.css'

const contentStyle: React.CSSProperties = {
  height: '400px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};

const MyCarousel: React.FC = () => (
  <Carousel className={style.container} autoplay>
    <div >
      <h3 style={contentStyle}>  <img src="./sky.jpg"   width={1550}
                  height={400}/></h3>
    
    </div>
    <div>
      <h3 style={contentStyle}>  <img src="./Inside-Out-November-Movie-Night-Web-Banner.jpg"   width={1550}
                  height={400}/></h3>
    </div>
    <div>
      <h3 style={contentStyle}> <img src="./the-avengers-movie-poster-banners-03.jpg"   width={1550}
                  height={400}/></h3>
    </div>
   
  </Carousel>
);

export default MyCarousel;