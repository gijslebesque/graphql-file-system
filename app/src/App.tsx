import React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AppBar } from "./components/AppBar";
import { Apollo } from "./providers";
import { UploadFile } from "./components/UploadFile";
import { GetFiles } from "./components/GetFiles";
import { Container } from "@mui/material";
import { Search } from "./components/Search";

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
        <Box>
          <AppBar />
        </Box>
        <Container>
          <Box sx={{ my: 4 }}>
            <UploadFile />
          </Box>

          <Box sx={{ my: 4 }}>
            <Search />
          </Box>

          <GetFiles />
        </Container>
      </ThemeProvider>
    </Apollo>
  );
};
