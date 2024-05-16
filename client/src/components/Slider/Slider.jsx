import { useEffect, useState } from "react";
import { MdOutlineEast, MdOutlineWest } from "react-icons/md";

import "./Slider.scss";

const imgs = [
  "https://images.pexels.com/photos/1629020/pexels-photo-1629020.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/837140/pexels-photo-837140.jpeg?auto=compress&cs=tinysrgb&w=1600",
  "https://images.pexels.com/photos/4172177/pexels-photo-4172177.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
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
    const changeSlides = setInterval(handleNext, 3500);

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
          <MdOutlineWest style={{ fontSize: "24px" }} />
        </div>
        <div className="icon" onClick={handleNext}>
          <MdOutlineEast style={{ fontSize: "24px" }} />
        </div>
      </div>
    </div>
  );
}

export default Slider;
