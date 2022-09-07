import axios from "axios";
import { GetStaticPaths, GetStaticProps } from "next";
import FutureImage from "next/future/image";
import { useRouter } from "next/router";
import { useState } from "react";
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
  defaultPriceId: string;
};

interface ProductItemProps {
  product: ProductType;
}

export default function ProductItem({ product }: ProductItemProps) {
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
    useState<boolean>(false);
  const router = useRouter();

  async function handleBuyProduct() {
    try {
      setIsCreatingCheckoutSession(true);
      const response = await axios.post("/api/checkout", {
        priceId: product.defaultPriceId,
      });

      const { checkoutUrl } = response.data;
      redirectToRoute(checkoutUrl, { external: true });
    } catch (err) {
      console.log(err);
      console.log("Falha ao redirecionar ao checkout");
      setIsCreatingCheckoutSession(false);
    }
  }

  async function redirectToRoute(
    url: string,
    options: { external: boolean },
  ): Promise<void> {
    const { external } = options;
    if (external) {
      window.location.href = url;
      return;
    } else {
      await router.push(url);
    }
  }

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

          <button
            onClick={handleBuyProduct}
            disabled={isCreatingCheckoutSession}>
            Comprar Agora
          </button>
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
    defaultPriceId: price.id,
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
