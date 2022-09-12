import "keen-slider/keen-slider.min.css";

import { GetStaticProps } from "next";
import FutureImage from "next/future/image";
import Head from "next/head";
import Link from "next/link";
import { Handbag } from "phosphor-react";
import Stripe from "stripe";
import { formatCurrencyString, Product } from "use-shopping-cart/core";

import { Arrow } from "../components/Arrow";
import { useSlider } from "../hooks/useSlider";
import { stripe } from "../lib/stripe";
import { ButtonStyle } from "../styles/common/ButtonStyle";
import { Typograph } from "../styles/common/TypographStyle";
import {
  CarrosselContainer,
  HomeContainer,
  ProductCard,
} from "../styles/pages/home";
import { convertHourToSeconds } from "../utils/convert-time.util";

interface HomeProps {
  products: Product[];
}

export default function Home({ products }: HomeProps) {
  const { currentSlide, instanceRef, loaded, sliderRef } = useSlider();

  return (
    <>
      <Head>
        <title>Home | Ignite Shop</title>
      </Head>

      <HomeContainer>
        <CarrosselContainer ref={sliderRef} className="keen-slider">
          {products.map((product, index) => (
            <Link
              key={product.id}
              href={`/product/${product.id}`}
              passHref
              prefetch={false}
              className="keen-slider__slide">
              <ProductCard className={`${currentSlide === index && "active"}`}>
                <FutureImage
                  src={product.image}
                  width={520}
                  height={480}
                  alt={product.name}
                />
                <footer>
                  <div>
                    <Typograph as="strong" size="lg">
                      {product.name}
                    </Typograph>
                    <Typograph as="span" size="xl" weigth="bold">
                      {formatCurrencyString({
                        value: product.price,
                        currency: product.currency,
                      })}
                    </Typograph>
                  </div>
                  <ButtonStyle color="primary" height="md">
                    <Handbag size={32} weight="bold" />
                  </ButtonStyle>
                </footer>
              </ProductCard>
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
  const products: Product[] = response.data.map((productItem) => {
    const price = productItem.default_price as Stripe.Price;
    return {
      id: productItem.id,
      price_id: price.id,
      name: productItem.name,
      image: productItem.images[0],
      price: price.unit_amount,
      currency: "BRL",
      description: productItem.description,
      price_data: price,
      product_data: productItem,
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
