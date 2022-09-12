import axios from "axios";
import FutureImage from "next/future/image";
import { X } from "phosphor-react";
import { useMemo, useState } from "react";
import { useShoppingCart } from "use-shopping-cart";

import { useOverlap } from "../../../hooks/useOverlap";
import { useRedirect } from "../../../hooks/useRedirect";
import { ButtonStyle } from "../../../styles/common/ButtonStyle";
import { Typograph } from "../../../styles/common/TypographStyle";
import {
  ImageContainer,
  ListContainer,
  ListItem,
  OverlapContainer,
  TextButton,
  TextInfoContainer,
} from "../../../styles/pages/shopping-cart";

export function ShoppingCartOverlap() {
  const { isOpen, close } = useOverlap();
  const { redirect } = useRedirect();
  const cart = useShoppingCart();
  const { removeItem, cartDetails, clearCart, formattedTotalPrice } = cart;

  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
    useState<boolean>(false);

  async function handleBuyProduct() {
    try {
      setIsCreatingCheckoutSession(true);
      const response = await axios.post("/api/checkout", {
        cartDetails,
      });

      const { checkoutUrl } = response.data;
      clearCart();
      await redirect(checkoutUrl, { external: true });
    } catch (err) {
      console.log(err);
      console.log("Falha ao redirecionar ao checkout");
      setIsCreatingCheckoutSession(false);
    }
  }

  const cartList = useMemo(() => {
    return Object.values(cartDetails ?? {}).map((value) => value);
  }, [cartDetails]);

  return (
    <OverlapContainer open={isOpen}>
      <header>
        <TextButton onClick={close} color="gray">
          <X size={32} weight="bold" />
        </TextButton>
      </header>
      <div>
        <section>
          <Typograph as="h3" size="md" weigth="bold">
            Sacola de compras
          </Typograph>
          <ListContainer>
            {cartList.map((cartItem) => (
              <ListItem key={cartItem.id}>
                <ImageContainer>
                  <FutureImage
                    src={cartItem.image}
                    height={100}
                    width={100}
                    alt={cartItem.name}
                  />
                </ImageContainer>
                <div>
                  <Typograph size="md">{cartItem.name}</Typograph>
                  <Typograph size="md" weigth="bold">
                    {cartItem.formattedValue}
                  </Typograph>

                  <TextButton onClick={() => removeItem(cartItem.id)}>
                    Remover
                  </TextButton>
                </div>
              </ListItem>
            ))}
          </ListContainer>
        </section>
        <footer>
          <TextInfoContainer>
            <div>
              <Typograph>Quantidade</Typograph>
              <Typograph size="md">{cartList.length}</Typograph>
            </div>
            <div>
              <Typograph size="md" weigth="bold">
                Valor Total
              </Typograph>
              <Typograph size="xl" weigth="bold">
                {formattedTotalPrice}
              </Typograph>
            </div>
          </TextInfoContainer>
          <ButtonStyle
            onClick={handleBuyProduct}
            disabled={isCreatingCheckoutSession || cartList.length === 0}
            color="primary"
            height="xl">
            Comprar
          </ButtonStyle>
        </footer>
      </div>
    </OverlapContainer>
  );
}
