import "keen-slider/keen-slider.min.css";

import { useKeenSlider } from "keen-slider/react";
import { GetStaticProps } from "next";
import FutureImage from "next/future/image";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import Stripe from "stripe";

import { Arrow } from "../components/Arrow";
import { stripe } from "../lib/stripe";
import {
  ButtonCart,
  CarrosselContainer,
  HomeContainer,
  Product,
} from "../styles/pages/home";
import { convertHourToSeconds } from "../utils/convert-time.util";
import { formatCurrencyBRL } from "../utils/number-format.util";

type ProductType = {
  id: string;
  name: string;
  imageUrl: string;
  price: string;
};

interface HomeProps {
  products: ProductType[];
}

export default function Home({ products }: HomeProps) {
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

  return (
    <>
      <Head>
        <title>Home | Ignite Shop</title>
      </Head>

      <HomeContainer ref={sliderRef}>
        <CarrosselContainer className="keen-slider">
          {products.map((product, index) => (
            <Link
              key={product.id}
              href={`/product/${product.id}`}
              passHref
              prefetch={false}
              className="keen-slider__slide">
              <Product className={`${currentSlide === index && "active"}`}>
                <FutureImage
                  src={product.imageUrl}
                  width={520}
                  height={480}
                  alt={product.name}
                />
                <footer>
                  <div>
                    <strong>{product.name}</strong>
                    <span>{product.price}</span>
                  </div>
                  <ButtonCart>I</ButtonCart>
                </footer>
              </Product>
            </Link>
          ))}
          {loaded && instanceRef.current && (
            <>
              <Arrow
                left
                onClick={(e) =>
                  e.stopPropagation() || instanceRef.current?.prev()
                }
              />

              <Arrow
                onClick={(e) =>
                  e.stopPropagation() || instanceRef.current?.next()
                }
              />
            </>
          )}
        </CarrosselContainer>
      </HomeContainer>
    </>
  );
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const response = await stripe.products.list({
    expand: ["data.default_price"],
  });
  const products: ProductType[] = response.data.map((productItem) => {
    const price = productItem.default_price as Stripe.Price;
    return {
      id: productItem.id,
      name: productItem.name,
      imageUrl: productItem.images[0],
      price: formatCurrencyBRL(price.unit_amount / 100),
    };
  });

  const revalidate = convertHourToSeconds(2);
  return {
    props: {
      products,
    },
    revalidate: revalidate,
  };
};
