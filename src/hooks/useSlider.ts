import { useKeenSlider } from "keen-slider/react";
import { useState } from "react";

export function useSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    breakpoints: {
      "(min-width: 800px)": {
        slides: { perView: 2, spacing: 32 },
      },
      "(min-width: 1100px)": {
        slides: { perView: 2, spacing: 48, origin: "center" },
      },
    },
    slides: { perView: 1, spacing: 16 },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
  });

  return {
    currentSlide,
    setCurrentSlide,
    loaded,
    setLoaded,
    sliderRef,
    instanceRef,
  };
}
