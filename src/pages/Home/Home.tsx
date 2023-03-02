import { useEffect, useContext, useState } from "react";
import { Box, Button, CircularProgress, Tab, Tabs } from "@mui/material";
import { AppStoreContext } from "../../components/App/App";
import { observer } from "mobx-react-lite";
import { TabPanel, a11yProps } from "./components/TabPanel";
import BalancesTable from "./components/BalanceTable";

function Home() {
  const appStore = useContext(AppStoreContext);

  const [html, setHtml] = useState("");
  const [tabIndex, setTabIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    appStore.parentWindow.onMessage(async (message) => {
      setIsLoading(true);
      switch (message.type) {
        case "CRYPTO_BUTTON_CLICKED":
          await appStore.authStore.initAccountInfo();
          setHtml(message.content.message);
          break;
      }
      setIsLoading(false);
    });
  }, []);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Button
          disabled={isLoading}
          variant="contained"
          onClick={() => {
            appStore.parentWindow.sendMessage({
              type: "SCAN_DOM",
            });
          }}
        >
          Scan
        </Button>
        <Button
          disabled={isLoading}
          onClick={async (event) => {
            await appStore.authStore.logout();
          }}
          variant="contained"
        >
          Logout
        </Button>
      </Box>
      <Tabs
        disabled={isLoading}
        value={tabIndex}
        onChange={async (event: React.SyntheticEvent, newValue: number) => {
          setIsLoading(true);
          setTabIndex(newValue);
          switch (newValue) {
            case 0:
              await appStore.authStore.initAccountInfo();
              break;
            case 1:
              //
              break;
          }
          setIsLoading(false);
        }}
        aria-label="tabs"
      >
        <Tab label="Balance" {...a11yProps(0)} />
        <Tab label="Trade History" {...a11yProps(1)} />
      </Tabs>
      <TabPanel value={tabIndex} index={0}>
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
            <BalancesTable accountInfo={appStore.authStore.accountInfo} />
          </>
        )}
      </TabPanel>
      <TabPanel value={tabIndex} index={1}>
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
          <>{html}</>
        )}
      </TabPanel>
    </>
  );
}

export default observer(Home);
