import React, { createContext, useState, useEffect } from 'react';

// Create the Theme Context
export const ThemeContext = createContext();

// ThemeProvider component to provide the theme and toggle function
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');


  // Toggle theme function
  const toggleTheme = () => {
    
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);  // Save to local storage
  };

  // Apply the theme to the body element
  // useEffect(() => {
  //   document.body.classList.remove('light', 'dark');
  //   document.body.classList.add(theme);
  // }, [theme]);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');  // Add dark class to root element
    } else {
      document.documentElement.classList.remove('dark');  // Remove dark class for light theme
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
