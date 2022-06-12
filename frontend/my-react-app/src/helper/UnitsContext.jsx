import { createContext, useState } from "react";

export const UnitContext = createContext();

export function UnitContextPorvider({ children }) {
  const [changeElevation, setChangeElevation] = useState(() => {
    return JSON.parse(sessionStorage.getItem("unitFlag")) ?? true;
  });

  return (
    <UnitContext.Provider value={{ changeElevation, setChangeElevation }}>
      {children}
    </UnitContext.Provider>
  );
}
