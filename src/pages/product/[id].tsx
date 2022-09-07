import { GetStaticPaths, GetStaticProps } from "next";
import FutureImage from "next/future/image";
import { useRouter } from "next/router";
import Stripe from "stripe";

import { stripe } from "../../lib/stripe";
import {
  ImageContainer,
  ProductContainer,
  ProductDetails,
} from "../../styles/pages/product";
import { formatCurrencyBRL } from "../../utils/number-format.util";

type ProductType = {
  id: string;
  name: string;
  imageUrl: string;
  price: string;
  description: string;
};

interface ProductItemProps {
  product: ProductType;
}

export default function ProductItem({ product }: ProductItemProps) {
  const { isFallback } = useRouter();

  return (
    <>
      <ProductContainer>
        <ImageContainer>
          <FutureImage src={product.imageUrl} width={520} height={480} />
        </ImageContainer>

        <ProductDetails>
          <h1>{product.name}</h1>
          <span>{product.price}</span>

          <p>{product.description}</p>

          <button>Comprar Agora</button>
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
    name: product.name,
    imageUrl: product.images[0],
    price: formatCurrencyBRL(price.unit_amount / 100),
    description: product.description,
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
    fallback: true,
  };
};
