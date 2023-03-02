import { useEffect, useContext, useState } from "react";
import { Box, Button, CircularProgress, Tab, Tabs } from "@mui/material";
import { AppStoreContext } from "../../components/App/App";
import { observer } from "mobx-react-lite";
import { TabPanel, a11yProps } from "./components/TabPanel";
import BalancesTable from "./components/BalanceTable";
import OrderList from "./components/OrderList";

function Home() {
  const appStore = useContext(AppStoreContext);

  const [tabIndex, setTabIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    appStore.parentWindow.onMessage(async (message) => {
      setIsLoading(true);
      switch (message.type) {
        case "CRYPTO_BUTTON_CLICKED":
          await appStore.domainStore.prefetch();
          console.log(message);
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
            await appStore.domainStore.logout();
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
          await appStore.domainStore.prefetch();
          setIsLoading(false);
        }}
        aria-label="tabs"
      >
        <Tab label="Balance" {...a11yProps(0)} />
        <Tab label="Orders" {...a11yProps(1)} />
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
            <BalancesTable accountInfo={appStore.domainStore.accountInfo} />
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
          <>
            <OrderList orders={appStore.domainStore.orders} />
          </>
        )}
      </TabPanel>
    </>
  );
}

export default observer(Home);
