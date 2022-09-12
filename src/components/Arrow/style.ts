import { styled } from "../../styles";

export const ArrowSvgContainer = styled("svg", {
  "&.arrow": {
    width: "30px",
    height: "30px",
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    "-webkit-transform": "translateY(-50%)",
    fill: "#fff",
    cursor: "pointer",
  },

  "&.arrow--left": {
    left: "5px",
  },

  "&.arrow--right": {
    left: "auto",
    right: "5px",
  },

  "&.arrow--disabled": {
    fill: "rgba(255, 255, 255, 0.5)",
  },
});
