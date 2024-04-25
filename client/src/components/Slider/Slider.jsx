import { useEffect, useState } from "react";
import { EastOutlined, WestOutlined } from "@mui/icons-material";

import "./Slider.scss";

const imgs = [
  "https://images.pexels.com/photos/1549200/pexels-photo-1549200.jpeg?auto=compress&cs=tinysrgb&w=1600",
  "https://images.pexels.com/photos/949670/pexels-photo-949670.jpeg?auto=compress&cs=tinysrgb&w=1600",
  "https://images.pexels.com/photos/837140/pexels-photo-837140.jpeg?auto=compress&cs=tinysrgb&w=1600",
];

function Slider() {
  const [sliderItem, setSliderItem] = useState(0);

  function handlePrev() {
    setSliderItem((item) => (item === 0 ? 2 : item - 1));
  }

  function handleNext() {
    setSliderItem((item) => (item === 2 ? 0 : item + 1));
  }

  useEffect(function () {
    const changeSlides = setInterval(handleNext, 3000);

    return function () {
      clearInterval(changeSlides);
    };
  }, []);

  return (
    <div className="slider">
      <div
        className="container"
        style={{ transform: `translateX(-${sliderItem * 100}vw)` }}
      >
        {imgs.map((img, i) => (
          <img src={img} alt={`img${i}`} key={i} />
        ))}
      </div>
      <div className="icons">
        <div className="icon" onClick={handlePrev}>
          <WestOutlined />
        </div>
        <div className="icon" onClick={handleNext}>
          <EastOutlined />
        </div>
      </div>
    </div>
  );
}

export default Slider;
