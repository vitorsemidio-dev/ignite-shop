import FutureImage from "next/future/image";
import { useRouter } from "next/router";
import {
  ImageContainer,
  ProductContainer,
  ProductDetails,
} from "../../styles/pages/product";

import tShirtImg from "../../assets/shirt-1.png";

export default function ProductItem() {
  const { query } = useRouter();
  const { id } = query;
  return (
    <>
      <ProductContainer>
        <ImageContainer>
          <FutureImage src={tShirtImg} />
        </ImageContainer>

        <ProductDetails>
          <h1>Camiseta X</h1>
          <span>R$ 79,90</span>

          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Perferendis dolorem laudantium voluptatibus, ullam similique,
            dolorum optio incidunt ducimus sit quam corrupti ut totam possimus
            architecto numquam aliquam. Eos, sint explicabo.
          </p>

          <button>Comprar Agora</button>
        </ProductDetails>
      </ProductContainer>
    </>
  );
}
