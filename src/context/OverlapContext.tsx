import { createContext, useState } from "react";

type OverlapContextType = {
  isOpen: boolean;
  setIsOpen: (state: boolean) => void;
  close: () => void;
  open: () => void;
  toggle: () => void;
};

export const OverlapContext = createContext({} as OverlapContextType);

export function OverlapContextProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  function close() {
    setIsOpen(false);
  }

  function open() {
    setIsOpen(true);
  }

  function toggle() {
    setIsOpen((state) => !state);
  }

  return (
    <OverlapContext.Provider
      value={{
        isOpen,
        setIsOpen,
        close,
        open,
        toggle,
      }}>
      {children}
    </OverlapContext.Provider>
  );
}
