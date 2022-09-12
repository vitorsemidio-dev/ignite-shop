import { GetServerSideProps } from "next";
import ImageFuture from "next/future/image";
import Head from "next/head";
import Link from "next/link";
import { useMemo } from "react";
import Stripe from "stripe";

import { stripe } from "../../lib/stripe";
import { Typograph } from "../../styles/common/TypographStyle";
import {
  ImageItemContainer,
  ImageList,
  SuccessContainer,
} from "../../styles/pages/success";

interface SuccessProps {
  customerName: string;
  products: Array<{
    id: string;
    name: string;
    imageUrl: string;
  }>;
}

export default function Success({
  customerName,
  products: products,
}: SuccessProps) {
  const productsBought = useMemo(() => {
    const tshirtWord = products.length === 1 ? "camiseta" : "camisetas";
    return `${products.length} ${tshirtWord}`;
  }, [products]);

  return (
    <>
      <Head>
        <title>Compra efetuada | Ignite Shop</title>

        <meta name="robots" content="noindex" />
      </Head>

      <SuccessContainer>
        <ImageList>
          {products.map((product) => (
            <ImageItemContainer key={product.imageUrl}>
              <ImageFuture
                src={product.imageUrl}
                alt={product.name}
                width={120}
                height={110}
              />
            </ImageItemContainer>
          ))}
        </ImageList>
        <Typograph as="h1">Compra efetuada!</Typograph>
        <Typograph as="p">
          Uhuul <Typograph as="strong">{customerName}</Typograph>, sua compra de{" "}
          {productsBought} já está a caminho da sua casa.
        </Typograph>

        <Link href="/">Voltar ao catálogo</Link>
      </SuccessContainer>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<SuccessProps> = async ({
  query,
  params,
}) => {
  if (!query.session_id) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const sessionId = String(query.session_id);

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["line_items", "line_items.data.price.product"],
  });

  const customerName = session.customer_details.name;
  const productStripe = session.line_items.data.map(
    (item) => item.price.product as Stripe.Product,
  );

  const successProps = {
    customerName,
    products: productStripe.map((item) => ({
      id: item.id,
      name: item.name,
      imageUrl: item.images[0],
    })),
  };

  return {
    props: {
      ...successProps,
    },
  };
};
