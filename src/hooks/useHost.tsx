"use client";

import { useEffect, useState } from "react";

export default function useOrigin() {
  const [mounted, setMounted] = useState(false);
  const host =
    typeof window !== "undefined" && window.location.host
      ? window.location.host
      : "";

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const apiURL =
    process.env.NODE_ENV !== "production"
      ? `http://localhost:3000`
      : `https://${host}`;

  return apiURL;
}
