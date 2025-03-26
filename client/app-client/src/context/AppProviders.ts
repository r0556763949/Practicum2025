import React from "react";
import { ClientsProvider } from "./context/ClientsContext";
// בעתיד ניתן להוסיף כאן פרוביידרים נוספים.

const AppProviders = ({ children : any}) => {
  return (
    <ClientsProvider>
      {/* ניתן להוסיף עוד פרוביידרים כאן */}
      {children}
    </ClientsProvider>
  );
};

export default AppProviders;
