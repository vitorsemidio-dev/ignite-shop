import { GetServerSideProps } from "next";
import ImageFuture from "next/future/image";
import Head from "next/head";
import Link from "next/link";
import Stripe from "stripe";

import { stripe } from "../../lib/stripe";
import { ImageContainer, SuccessContainer } from "../../styles/pages/success";

interface SuccessProps {
  customerName: string;
  product: {
    name: string;
    imageUrl: string;
  };
}

export default function Success({ customerName, product }: SuccessProps) {
  return (
    <>
      <Head>
        <title>Compra efetuada | Ignite Shop</title>

        <meta name="robots" content="noindex" />
      </Head>

      <SuccessContainer>
        <h1>Compra efetuada!</h1>
        <ImageContainer>
          <ImageFuture
            src={product.imageUrl}
            alt={product.name}
            width={120}
            height={110}
          />
        </ImageContainer>
        <p>
          Uhuul <strong>{customerName}</strong>, sua compra{" "}
          <strong>{product.name}</strong> já está a caminho da sua casa.
        </p>

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
  const productStripe = session.line_items.data[0].price
    .product as Stripe.Product;

  const successProps = {
    customerName,
    product: {
      name: productStripe.name,
      imageUrl: productStripe.images[0],
    },
  };

  return {
    props: {
      ...successProps,
    },
  };
};
