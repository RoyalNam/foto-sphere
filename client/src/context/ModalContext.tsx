import { createContext, useContext, useState } from "react";
import { Photo } from "@/types";

interface ModalContextType {
  activePhoto: Photo | null;
  openModal: (photo: Photo) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [activePhoto, setActivePhoto] = useState<Photo | null>(null);

  const openModal = (photo: Photo) => {
    setActivePhoto(photo);
  };

  const closeModal = () => {
    setActivePhoto(null);
  };

  return (
    <ModalContext.Provider value={{ activePhoto, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};
