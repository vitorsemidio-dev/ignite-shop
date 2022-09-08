import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import { GetStaticProps } from "next";
import FutureImage from "next/future/image";
import Head from "next/head";
import Link from "next/link";
import Stripe from "stripe";

import { stripe } from "../lib/stripe";
import { HomeContainer, Product } from "../styles/pages/home";
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
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    },
  });

  return (
    <>
      <Head>
        <title>Home | Ignite Shop</title>
      </Head>

      <HomeContainer ref={sliderRef} className="keen-slider">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/product/${product.id}`}
            passHref
            prefetch={false}>
            <Product className="keen-slider__slide">
              <FutureImage
                src={product.imageUrl}
                width={520}
                height={480}
                alt={product.name}
              />
              <footer>
                <strong>{product.name}</strong>
                <span>{product.price}</span>
              </footer>
            </Product>
          </Link>
        ))}
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
