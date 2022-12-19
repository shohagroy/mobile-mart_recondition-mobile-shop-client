import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import img1 from "../../../../assets/banar/oppo-f19-pro.png";
import img2 from "../../../../assets/banar/realmi.jpg";
import img3 from "../../../../assets/banar/vivo-x80.png";
import img4 from "../../../../assets/banar/xiaomi-redmi-note-11-pro.png";

const Carosole = () => {
  return (
    <div>
      <Carousel autoPlay="true" infiniteLoop="true" interval="5000">
        <div>
          <img src={img1} />
        </div>

        <div>
          <img src={img2} />
        </div>

        <div>
          <img src={img3} />
        </div>

        <div>
          <img src={img4} />
        </div>
      </Carousel>
    </div>
  );
};

export default Carosole;
