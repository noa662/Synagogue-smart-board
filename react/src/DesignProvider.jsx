// import designSettings from './designSettings';

// const DesignProvider = ({ children }) => {
//     const rootStyle = {
//         '--font': designSettings.font,
//         '--color': designSettings.color,
//         '--background': designSettings.background,
//     };
//     return <div style={rootStyle}>{children}</div>;
// };

// export default DesignProvider;

import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const DesignContext = createContext();

const DesignProvider = ({ children }) => {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:8080/settings", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSettings(response.data);
      } catch (err) {
        console.error("שגיאה בשליפת ההגדרות", err);
      }
    };

    fetchSettings();
  }, []);

  // Apply styles to the DOM when settings change
  useEffect(() => {
    if (settings) {
      document.body.style.backgroundImage = settings.background;
      document.body.style.fontFamily = settings.font;
      document.documentElement.style.setProperty('--main-color', settings.color);
    }
  }, [settings]);

  return (
    <DesignContext.Provider value={{ settings, setSettings }}>
      {children}
    </DesignContext.Provider>
  );
};

export default DesignProvider;
