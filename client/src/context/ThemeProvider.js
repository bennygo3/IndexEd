import React, { useState } from 'react';
import ThemeContext from './ThemeContext';

export default function ThemeProvider({ children }) {
    const [theme, setTheme] = useState('defaultTheme');

    return(
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};