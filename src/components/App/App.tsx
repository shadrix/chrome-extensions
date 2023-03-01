import { ThemeProvider } from "@mui/material";
import {createContext, useState} from "react";
import { ParentWindow } from "../../messaging/ParentWindow";
import { createTheme } from "@mui/material/styles";
import {IAppStore} from "../../interfaces/appStore";
import AuthStore from "../../stores/AuthStore";
import Layout from "../Layout";


const store: IAppStore = {
  'authStore':  new AuthStore(),
  'parentWindow': new ParentWindow()
}

export const AppStoreContext = createContext(store);

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        light: "#63b8ff",
        main: "#0989e3",
        dark: "#005db0",
        contrastText: "#000",
      },
      secondary: {
        main: "#089b0f",
        light: "#16df59",
        dark: "#008609",
        contrastText: "#000",
      },
    },
  });
  
  const [appStore, setAppStore] = useState(store);

  return (
    <ThemeProvider theme={theme}>
      <AppStoreContext.Provider value={appStore}>
        <Layout/>
      </AppStoreContext.Provider>
    </ThemeProvider>
  );
}

export default App;
