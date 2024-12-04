"use client";
import React, { createContext, useState, useEffect } from "react";
export const ResizeContext = createContext({
  isMobile: false,
});

export const ResizeProvider = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 960);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <ResizeContext.Provider value={{ isMobile }}>
      {children}
    </ResizeContext.Provider>
  );
};
