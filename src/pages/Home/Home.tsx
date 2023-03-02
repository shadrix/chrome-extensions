import { useEffect, useContext, useState } from "react";
import { Box, Button, Tab, Tabs, Typography } from "@mui/material";
import { AppStoreContext } from "../../components/App/App";
import { observer } from "mobx-react-lite";
import { TabPanel, a11yProps } from "./components/TabPanel";

function Home() {
  const appStore = useContext(AppStoreContext);

  const [html, setHtml] = useState("");
  const [tabIndex, setTabIndex] = useState(0);

  useEffect(() => {
    appStore.parentWindow.onMessage((message) => {
      console.log(message);
      switch (message.type) {
        case "CRYPTO_BUTTON_CLICKED":
          setHtml(message.content.message);
          break;
      }
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
          onClick={async (event) => {
            await appStore.authStore.logout();
          }}
          variant="contained"
        >
          Logout
        </Button>
      </Box>
      <Tabs
        value={tabIndex}
        onChange={(event: React.SyntheticEvent, newValue: number) => {
          setTabIndex(newValue);
        }}
        aria-label="tabs"
      >
        <Tab label="Balance" {...a11yProps(0)} />
        <Tab label="Trade History" {...a11yProps(1)} />
      </Tabs>
      <TabPanel value={tabIndex} index={0}>
        {html}
      </TabPanel>
      <TabPanel value={tabIndex} index={1}>
        Item Two
      </TabPanel>
    </>
  );
}

export default observer(Home);
