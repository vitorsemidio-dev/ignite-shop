import FutureImage from "next/future/image";
import Link from "next/link";
import { Handbag } from "phosphor-react";

import logoImg from "../../../assets/logo.svg";
import { useOverlap } from "../../../hooks/useOverlap";
import { ButtonStyle } from "../../../styles/common/ButtonStyle";
import { HeaderContainer } from "../../../styles/pages/app";

export default function HeaderApp() {
  const { toggle } = useOverlap();
  return (
    <HeaderContainer>
      <Link href="/" passHref prefetch={false}>
        <FutureImage src={logoImg} alt="Logo Ignite Shop" />
      </Link>

      <ButtonStyle onClick={toggle} color="secondary" height="sm">
        <Handbag size={24} weight="bold" />
      </ButtonStyle>
    </HeaderContainer>
  );
}
