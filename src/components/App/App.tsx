import { ThemeProvider } from "@mui/material";
import { createContext, useState } from "react";
import { ParentWindow } from "../../messaging/ParentWindow";
import { IAppStore } from "../../interfaces/appStore";
import AuthStore from "../../stores/AuthStore";
import Layout from "../Layout"; 

const store: IAppStore = {
  authStore: new AuthStore(),
  parentWindow: new ParentWindow()
};

export const AppStoreContext = createContext(store);

function App() {
  const [appStore, setAppStore] = useState(store);

  return (
    <AppStoreContext.Provider value={appStore}>
      <Layout />
    </AppStoreContext.Provider>
  );
}

export default App;
