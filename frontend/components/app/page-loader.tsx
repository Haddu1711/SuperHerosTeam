"use client";

import { Loader2 } from "lucide-react";

const PageLoader = () => {
  return (
    <div className="absolute z-50 flex h-screen w-full flex-col items-center justify-center">
      <Loader2 className="mr-2 h-16 w-16 animate-spin" />
    </div>
  );
};

export default PageLoader;
