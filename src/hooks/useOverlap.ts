import { useContext } from "react";
import { OverlapContext } from "../context/OverlapContext";

export function useOverlap() {
  const { isOpen, setIsOpen, close, open, toggle } = useContext(OverlapContext);
  return { isOpen, setIsOpen, close, open, toggle };
}
