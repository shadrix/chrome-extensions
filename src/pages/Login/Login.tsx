import { useContext, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import { AppStoreContext } from "../../components/App/App";
import { observer } from "mobx-react-lite";

function Login() {
  const appStore = useContext(AppStoreContext);

  const [apiKey, setApiKey] = useState("");
  const [apiSecret, setApiSecret] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Box
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <Box
        component="form"
        onSubmit={async (event) => {
          event.preventDefault();
          if (!isLoading) {
            setIsLoading(true);
            await appStore.authStore.login(apiKey, apiSecret);
            setIsLoading(false);
          }
        }}
        noValidate
        sx={{ mt: 1 }}
      >
        <TextField
          margin="normal"
          required
          fullWidth
          id="apiKey"
          label="Api Key"
          name="apiKey"
          autoComplete="apiKey"
          onChange={(event) => setApiKey(event.target.value)}
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="apiSecret"
          label="Api Secret"
          type="password"
          id="apiSecret"
          onChange={(event) => setApiSecret(event.target.value)}
          autoComplete="current-password"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          {isLoading ? <CircularProgress /> : "Login"}
        </Button>
      </Box>
    </Box>
  );
}

export default observer(Login);
