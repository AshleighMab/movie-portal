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
      <h3 style={contentStyle}></h3>
    </div>
    <div>
      <h3 style={contentStyle}></h3>
    </div>
    <div>
      <h3 style={contentStyle}></h3>
    </div>
    <div>
      <h3 style={contentStyle}></h3>
    </div>
  </Carousel>
);

export default MyCarousel;