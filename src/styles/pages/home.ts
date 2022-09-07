import { styled } from "..";

export const HomeContainer = styled("main", {
  display: "flex",
  width: "100vw",
  maxWidth: "calc(100vw - ((100vw - 1180px) / 2))",
  marginLeft: "auto",
  minHeight: 656,
});

export const Product = styled("a", {
  background: "$gradient",
  borderRadius: 8,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "relative",
  cursor: "pointer",
  overflow: "hidden",

  img: {
    objectFit: "cover",
  },

  footer: {
    position: "absolute",
    left: "0.25rem",
    right: "0.25rem",
    bottom: "0.25rem",

    transform: "translateY(110%)",
    opacity: 0,
    transition: "all 0.2s ease-in-out",

    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    padding: "20px 32px 20px 20px",
    gap: "8px",
    background: "rgba(32, 32, 36, 0.9)",
    borderRadius: "6px",

    strong: {
      fontSize: "$lg",
    },

    span: {
      fontSize: "$xl",
      FontWeight: "bold",
      color: "$green500",
    },
  },

  "&:hover": {
    footer: {
      transform: "translateY(0)",
      opacity: 1,
    },
  },
});
