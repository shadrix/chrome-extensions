import { useContext, useEffect, useState } from "react";
import { Box, CircularProgress } from "@mui/material";
import Home from "../../pages/Home";
import Login from "../../pages/Login";
import { AppStoreContext } from "../App/App";
import { observer } from "mobx-react-lite";

function Router() {
  const appStore = useContext(AppStoreContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      setIsLoading(true);
      await appStore.domainStore.prefetch();
      setIsLoading(false);
    };
    init();
  },[]);

  return (
    <>
      {isLoading ? (
        <Box
          height="100vh"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <CircularProgress />
        </Box>
      ) : (
        <>
          {!!appStore.domainStore.accountInfo &&
          appStore.domainStore.accountInfo !== null ? (
            <Home />
          ) : (
            <Login />
          )}
        </>
      )}
    </>
  );
}

export default observer(Router);
