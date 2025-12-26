
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ModalContextType {
  isConsentOpen: boolean;
  isBookingOpen: boolean;
  selectedPackage: string;
  openConsentModal: () => void;
  closeConsentModal: () => void;
  openBookingModal: (pkg?: string) => void;
  closeBookingModal: () => void;
  setSelectedPackage: (pkg: string) => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children?: ReactNode }) => {
  const [isConsentOpen, setConsentOpen] = useState(false);
  const [isBookingOpen, setBookingOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState('Auto Recommend');

  const openConsentModal = () => setConsentOpen(true);
  const closeConsentModal = () => setConsentOpen(false);
  
  const openBookingModal = (pkg?: string) => {
    if (pkg) setSelectedPackage(pkg);
    setBookingOpen(true);
  };
  
  const closeBookingModal = () => setBookingOpen(false);

  return (
    <ModalContext.Provider value={{
      isConsentOpen,
      isBookingOpen,
      selectedPackage,
      openConsentModal,
      closeConsentModal,
      openBookingModal,
      closeBookingModal,
      setSelectedPackage
    }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) throw new Error("useModal must be used within a ModalProvider");
  return context;
};
