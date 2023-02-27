import { CssBaseline, ThemeProvider } from "@mui/material";
import React, {createContext, useState} from "react";
import { ParentWindow } from "../../messaging/ParentWindow";
import { createTheme } from "@mui/material/styles";
import {IAppStore} from "../../interfaces/appStore";
import AuthStore from "../../stores/AuthStore";
import Home from "../../pages/Home";
import Login from "../../pages/Login";
import { observer } from "mobx-react-lite";


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
    <CssBaseline />
      {!!appStore.authStore.token ? <Home/> : <Login/>}
    </AppStoreContext.Provider>
    </ThemeProvider>
  );
}

export default  observer(App);
