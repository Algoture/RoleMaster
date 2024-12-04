"use client";

import { useContext } from "react";
import { ResizeContext } from "../utils/ResizeContext";

const Page = () => {
  const { isMobile } = useContext(ResizeContext);

  return (
    <div>
      
    </div>
  );
};

export default Page;
