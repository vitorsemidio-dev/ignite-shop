import { styled } from "..";

export const HomeContainer = styled("main", {
  width: "100vw",
});

export const CarrosselContainer = styled("div", {
  display: "flex",
  width: "100%",
  minHeight: 656,
  position: "relative",
});

export const Product = styled("div", {
  background: "$gradient",
  height: "100%",
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

    div: {
      display: "flex",
      flexDirection: "column",

      strong: {
        fontSize: "$lg",
      },

      span: {
        marginTop: "0.25rem",
        fontSize: "$xl",
        fontWeight: "bold",
        color: "$green500",
        lineHeight: 1.4,
      },
    },
  },

  "&:hover, &.active": {
    footer: {
      transform: "translateY(0)",
      opacity: 1,
    },
  },
});

export const ButtonCart = styled("button", {
  backgroundColor: "$green500",
  color: "$white",
  borderRadius: 6,
  padding: "0.75rem",
  cursor: "pointer",
  fontWeight: "bold",
  fontSize: "$lg",
  border: 0,
  width: 56,
  height: 56,

  "&:not(:disabled):hover": {
    backgroundColor: "$green300",
  },

  "&:disabled": {
    opacity: 0.6,
    cursor: "not-allowed",
  },
});
