import { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext();

// changes theme based on browsers setting (if initially dark then dark theme otherwise white)
const getInitialDarkMode = () => {
  const prefersDarkMode = window.matchMedia(
    "(prefers-color-scheme:dark)"
  ).matches;
  const storedDarkMode = localStorage.getItem("darkTheme") === "true";
  return storedDarkMode || prefersDarkMode;
};

export const AppProvider = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(getInitialDarkMode());
  // initial searched term,used in:-Gallery
  const [searchTerm, setSearchTerm] = useState("cat");
  // function to change the theme, used in :- ThemeToggle component

  const toggleDarkTheme = () => {
    const newDarkTheme = !isDarkTheme;
    setIsDarkTheme(newDarkTheme);
    // // selects the body element of the document
    // const body = document.querySelector("body");
    // // toggles the classList (when newDarkTheme is true "dark-theme " is applied otherwise removed )
    // body.classList.toggle("dark-theme", newDarkTheme);
    localStorage.setItem("darkTheme", newDarkTheme);
  };
  useEffect(() => {
    document.body.classList.toggle("dark-theme", isDarkTheme);
  }, [isDarkTheme]);

  return (
    <AppContext.Provider
      value={{ isDarkTheme, toggleDarkTheme, searchTerm, setSearchTerm }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => useContext(AppContext);
