import React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AppBar } from "./components/AppBar";
import { Welcome } from "./components/Welcome";
import { Apollo } from "./providers";
import { UploadFile } from "./components/UploadFile";
import { GetFiles } from "./components/GetFiles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#fa5a28",
    },
    secondary: {
      main: "#00ccb0",
    },
  },
});

export const App = () => {
  return (
    <Apollo>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ flexGrow: 1 }}>
          <AppBar />
        </Box>
        <UploadFile />
        <GetFiles></GetFiles>
      </ThemeProvider>
    </Apollo>
  );
};
