import { styled } from "..";

export const ButtonStyle = styled("button", {
  border: 0,
  borderRadius: 6,
  cursor: "pointer",
  fontWeight: "bold",
  fontSize: "$lg",
  padding: "0.75rem",

  "&:disabled": {
    opacity: 0.6,
    cursor: "not-allowed",
  },

  variants: {
    color: {
      primary: {
        backgroundColor: "$green500",
        color: "$white",
        "&:not(:disabled):hover": {
          backgroundColor: "$green300",
        },
      },
      secondary: {
        backgroundColor: "$gray800",
        color: "$gray500",
      },
    },

    height: {
      sm: {
        height: "3rem",
      },
      md: {
        height: "3.5rem",
      },
      lg: {
        height: "4rem",
      },
      xl: {
        height: "4.5rem",
      },
    },
  },
});
