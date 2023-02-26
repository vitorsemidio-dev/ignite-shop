import { GetStaticPaths, GetStaticProps } from "next";
import FutureImage from "next/future/image";
import Head from "next/head";
import Stripe from "stripe";
import { useShoppingCart } from "use-shopping-cart";
import { formatCurrencyString, Product } from "use-shopping-cart/core";

import { stripe } from "../../lib/stripe";
import { useOverlap } from "../../hooks/useOverlap";
import { ButtonStyle } from "../../styles/common/ButtonStyle";
import { Typograph } from "../../styles/common/TypographStyle";
import {
  ImageContainer,
  ProductContainer,
  ProductDetails,
} from "../../styles/pages/product";

interface ProductItemProps {
  product: Product;
}

export default function ProductItem({ product }: ProductItemProps) {
  const { addItem } = useShoppingCart();
  const { open } = useOverlap();

  function handleAddProduct(product: Product) {
    addItem(product);
    open();
  }

  return (
    <>
      <Head>
        <title>{product.name} | Ignite Shop</title>
      </Head>

      <ProductContainer>
        <ImageContainer>
          <FutureImage src={product.image} width={520} height={480} />
        </ImageContainer>

        <ProductDetails>
          <Typograph as="h1" weigth="bold" size="2xl">
            {product.name}
          </Typograph>

          <Typograph as="span" size="2xl">
            {formatCurrencyString({
              value: product.price,
              currency: product.currency,
            })}
          </Typograph>

          <Typograph as="p" size="md">
            {product.description}
          </Typograph>

          <ButtonStyle
            onClick={() => handleAddProduct(product)}
            color="primary"
            height="lg"
          >
            Colocar na Sacola
          </ButtonStyle>
        </ProductDetails>
      </ProductContainer>
    </>
  );
}

type ParamsType = {
  id: string;
};

export const getStaticProps: GetStaticProps<
  ProductItemProps,
  ParamsType
> = async ({ params }) => {
  const productId = params.id;

  const product = await stripe.products.retrieve(productId, {
    expand: ["default_price"],
  });

  const price = product.default_price as Stripe.Price;
  const productProp = {
    id: product.id,
    price_id: price.id,
    name: product.name,
    image: product.images[0],
    price: price.unit_amount,
    currency: "BRL",
    description: product.description,
    price_data: price,
    product_data: product,
  };

  return {
    props: {
      product: productProp,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { id: "prod_MO5Pdc4m3rNLi3" } }],
    fallback: "blocking",
  };
};
