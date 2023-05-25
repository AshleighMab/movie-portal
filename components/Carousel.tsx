import React from "react";
import { Carousel } from "antd";
import style from "./Carousel.module.css";

const contentStyle: React.CSSProperties = {
  height: "550px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};

const MyCarousel: React.FC = () => (
  <Carousel className={style.container} autoplay>
    <div>
      <h3 style={contentStyle}>
        {" "}
        <img
          src="./the-avengers-movie-poster-banners-03.jpg"
          width={"100%"}
          height={550}
        />
      </h3>
    </div>
    <div>
      <h3 style={contentStyle}>
        {" "}
        <img src="./insideOut.jpg" width={"100%"} height={550} />
      </h3>
    </div>
    <div>
      <h3 style={contentStyle}>
        {" "}
        <img src="./waf.jpg" width={"100%"} height={550} />
      </h3>
    </div>
  </Carousel>
);

export default MyCarousel;
