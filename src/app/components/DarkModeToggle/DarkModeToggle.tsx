"use client";

import { useEffect, useState } from "react";

export default function DarkModeToggle() {
  const [mode, setMode] = useState("light");

  const handleToggleMode = () => {
    setMode(mode === "light" ? "dark" : "light");
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", mode);
  }, [mode]);

  return (
    <div className="font-semibold cursor-pointer" onClick={handleToggleMode}>
      Dark Mode
    </div>
  );
}
