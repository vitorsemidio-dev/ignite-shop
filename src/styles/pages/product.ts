import { styled } from "..";

export const ProductContainer = styled("main", {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  alignItems: "stretch",
  gap: "4rem",

  margin: "0 auto",
  maxWidth: 1180,
});

export const ImageContainer = styled("div", {
  width: "100%",
  maxWidth: "576px",
  height: "656px",

  background: "$gradient",
  borderRadius: 8,
  padding: "0.25rem",

  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  img: {
    objectFit: "cover",
  },
});

export const ProductDetails = styled("div", {
  display: "flex",
  flexDirection: "column",

  h1: {
    color: "$gray300",
  },

  span: {
    marginTop: "1rem",
    display: "block",
    color: "$green300",
  },

  p: {
    marginTop: "2.5rem",
    lineHeight: 1.6,
    color: "$gray300",
  },

  button: {
    marginTop: "auto",
  },
});
