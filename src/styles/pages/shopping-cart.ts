import { styled } from "..";

export const OverlapContainer = styled("aside", {
  position: "absolute",
  zIndex: 10000,
  top: 0,
  right: 0,
  bottom: 0,
  width: 480,
  backgroundColor: "$gray800",
  display: "flex",
  flexDirection: "column",
  transform: "translate(100%)",
  opacity: 0,
  transition: "300ms",

  header: {
    padding: "1.5rem",
    display: "flex",
    justifyContent: "flex-end",
  },

  "> div": {
    padding: "3rem",
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",

    footer: {
      display: "flex",
      flexDirection: "column",
    },
  },

  variants: {
    open: {
      true: {
        transform: "translate(0%)",
        opacity: 1,
      },
    },
  },
});

export const TextInfoContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "0.25rem",
  div: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export const ListContainer = styled("ul", {
  listStyle: "none",
  marginTop: "2rem",
  display: "flex",
  flexDirection: "column",
  gap: "1.5rem",
});

export const ListItem = styled("li", {
  display: "grid",
  gap: "1.25rem",
  alignItems: "center",
  gridTemplateColumns: "auto 1fr",

  "> div": {
    display: "flex",
    flexDirection: "column",
  },
});

export const TextButton = styled("button", {
  appearance: "none",
  backgroundColor: "transparent",
  border: "none",
  color: "$green500",
  fontWeight: "bold",
  fontSize: "$sm",
  cursor: "pointer",
  width: "fit-content",
  marginTop: "0.5rem",

  "&:hover": {
    color: "$green300",
  },

  variants: {
    color: {
      gray: {
        color: "$gray500",
        "&:hover": {
          color: "$gray500",
        },
      },
    },
  },
});

export const ImageContainer = styled("div", {
  width: "6.25rem",
  height: "5.75rem",

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
