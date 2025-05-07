import React from "react";
import "../styles/components/darkModeToggle.css";

const DarkModeToggle = ({ theme, setTheme }) => {
  return (
    <div className="darkmode-toggle">
      {theme === "light" ? (
        <button
          className="sphere geidi-prime"
          onClick={() => setTheme("dark")}
          aria-label="Activar modo oscuro"
          title="Geidi Prime (oscuro)"
        />
      ) : (
        <button
          className="sphere arrakis"
          onClick={() => setTheme("light")}
          aria-label="Activar modo claro"
          title="Arrakis (claro)"
        />
      )}
    </div>
  );
};

export default DarkModeToggle;
