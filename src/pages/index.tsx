import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import FutureImage from "next/future/image";
import Stripe from "stripe";

import { GetServerSideProps } from "next";
import { stripe } from "../lib/stripe";
import { HomeContainer, Product } from "../styles/pages/home";

interface ProductProps {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
}

interface HomeProps {
  products: ProductProps[];
}

export default function Home({ products }: HomeProps) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    },
  });

  return (
    <>
      <HomeContainer ref={sliderRef} className="keen-slider">
        {products.map((product) => (
          <Product key={product.id} className="keen-slider__slide">
            <FutureImage
              src={product.imageUrl}
              width={520}
              height={480}
              alt={product.name}
            />
            <footer>
              <strong>{product.name}</strong>
              <span>R$ {product.price}</span>
            </footer>
          </Product>
        ))}
      </HomeContainer>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const response = await stripe.products.list({
    expand: ["data.default_price"],
  });
  const products: ProductProps[] = response.data.map((productItem) => {
    const price = productItem.default_price as Stripe.Price;
    return {
      id: productItem.id,
      name: productItem.name,
      imageUrl: productItem.images[0],
      price: price.unit_amount / 100,
    };
  });
  return {
    props: {
      products,
    },
  };
};
