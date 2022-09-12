import { styled } from "..";

export const Typograph = styled("span", {
  lineHeight: 1.6,
  variants: {
    size: {
      sm: {
        fontSize: "$sm",
      },
      md: {
        fontSize: "$md",
      },
      lg: {
        fontSize: "$lg",
      },
      xl: {
        fontSize: "$xl",
      },
      "2xl": {
        fontSize: "$2xl",
      },
    },

    weigth: {
      normal: {
        fontWeight: "normal",
      },
      bold: {
        fontWeight: "bold",
      },
    },
  },
});
