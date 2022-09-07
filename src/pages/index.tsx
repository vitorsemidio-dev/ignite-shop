import FutureImage from "next/future/image";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";

import tShirt1 from "../assets/shirt-1.png";
import tShirt2 from "../assets/shirt-2.png";
import tShirt3 from "../assets/shirt-3.png";
import tShirt4 from "../assets/shirt-4.png";

import { HomeContainer, Product } from "../styles/pages/home";

export default function Home() {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    },
  });

  const products = [tShirt1, tShirt2, tShirt3, tShirt4];
  return (
    <>
      <HomeContainer ref={sliderRef} className="keen-slider">
        {products.map((product) => (
          <Product key={product.src} className="keen-slider__slide">
            <FutureImage
              src={product}
              width={520}
              height={480}
              alt="camiseta"
            />
            <footer>
              <strong>Camiseta X</strong>
              <span>R$ 79,90</span>
            </footer>
          </Product>
        ))}
      </HomeContainer>
    </>
  );
}
