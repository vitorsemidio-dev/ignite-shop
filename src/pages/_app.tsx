import { AppProps } from "next/app";
import { globalStyles } from "../styles/global";
import FutureImage from "next/future/image";

import logoImg from "../assets/logo.svg";
import { Container, Header } from "../styles/pages/app";

globalStyles();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <Header>
        <FutureImage src={logoImg} alt="Logo Ignite Shop" />
      </Header>
      <Component {...pageProps} />
    </Container>
  );
}
