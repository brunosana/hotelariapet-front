"use client";

import { useStorage } from "@/stores";
import * as React from "react";

const Hydration = () => {
  React.useEffect(() => {
    useStorage.persist.rehydrate();
  }, []);

  return null;
};

export default Hydration;