import { useRouter } from "../../../node_modules/next/router";

export default function ProductItem() {
  const { query } = useRouter() as any;
  const { id } = query;
  return <h1>Product Item with id: {id}</h1>;
}
