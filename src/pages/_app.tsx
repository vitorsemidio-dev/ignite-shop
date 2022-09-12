import { AppProps } from "next/app";
import { CartProvider } from "use-shopping-cart";

import HeaderApp from "../components/app/HeaderApp";
import { ShoppingCartOverlap } from "../components/app/ShoppingCartOverlap";
import { OverlapContextProvider } from "../context/OverlapContext";
import { globalStyles } from "../styles/global";
import { Container } from "../styles/pages/app";

globalStyles();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <CartProvider
        mode="payment"
        cartMode="client-only"
        stripe={process.env.STRIPE_PUBLIC_KEY}
        successUrl={`${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`}
        cancelUrl={`${process.env.NEXT_URL}/`}
        currency="BRL"
        allowedCountries={["BR"]}
        billingAddressCollection={false}>
        <OverlapContextProvider>
          <HeaderApp />
          <Component {...pageProps} />
          <ShoppingCartOverlap />
        </OverlapContextProvider>
      </CartProvider>
    </Container>
  );
}
