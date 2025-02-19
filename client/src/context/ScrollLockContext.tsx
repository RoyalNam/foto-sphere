import { createContext, useContext, useEffect, useState } from "react";

interface ScrollLockContextType {
  lockScroll: () => void;
  unlockScroll: () => void;
}

const ScrollLockContext = createContext<ScrollLockContextType | undefined>(
  undefined
);

export const ScrollLockProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [lockCount, setLockCount] = useState(0);

  useEffect(() => {
    if (lockCount > 0) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "auto";
    }
  }, [lockCount]);

  const lockScroll = () => setLockCount((prev) => prev + 1);
  const unlockScroll = () => setLockCount((prev) => Math.max(prev - 1, 0));

  return (
    <ScrollLockContext.Provider value={{ lockScroll, unlockScroll }}>
      {children}
    </ScrollLockContext.Provider>
  );
};

export const useScrollLock = () => {
  const context = useContext(ScrollLockContext);
  if (!context) {
    throw new Error("useScrollLock must be used within a ScrollLockProvider");
  }
  return context;
};
