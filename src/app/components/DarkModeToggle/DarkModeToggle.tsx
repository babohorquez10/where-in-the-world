"use client";

import { useEffect, useState } from "react";
import { MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md";

type modeType = "light" | "dark";

export default function DarkModeToggle() {
  const [mode, setMode] = useState<modeType>("light");

  const handleToggleMode = () => {
    setMode(mode === "light" ? "dark" : "light");
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", mode);
  }, [mode]);

  return (
    <div
      className="font-light cursor-pointer flex items-center gap-2"
      onClick={handleToggleMode}
    >
      {mode === "dark" ? (
        <>
          <MdOutlineLightMode /> Light Mode
        </>
      ) : (
        <>
          <MdOutlineDarkMode /> Dark Mode
        </>
      )}
    </div>
  );
}
