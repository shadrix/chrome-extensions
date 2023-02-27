import { useContext } from "react";
import { Box, Button, CircularProgress, TextField, Typography } from "@mui/material";
import { AppStoreContext } from "../../components/App/App";
import LoginStore from "./LoginStore";
import {observer} from "mobx-react-lite";

const Login = () => {
  const appStore = useContext(AppStoreContext);
  const store = new LoginStore(appStore.authStore);

  return (
      <Box
          sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
          }}
      >
          <Typography component="h1" variant="h5">
              Sign in
          </Typography>
          <Box component="form"
               onSubmit={async (event) =>
               {
                   event.preventDefault()
                   await store.login()
               }}
               noValidate sx={{ mt: 1 }}>
              <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="apiKey"
                  label="Api Key"
                  name="apiKey"
                  autoComplete="apiKey"
                  onChange={(event) => store.changeApiKey(event.target.value)}
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
                  onChange={(event) => store.changeApiSecret(event.target.value)}
                  autoComplete="current-password"
              />
              {!!store.error && (
                  <p style={{ color: 'red', fontSize: 14 }}>{store.error}</p>
              )}
              <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
              >
                  {store.isLoading ? (
                      <CircularProgress />
                  ) : (
                      'Login'
                  )}
              </Button>
          </Box>
      </Box>
  )
}

export default observer(Login)

