import React, { useState } from "react";
import Layout from "./containers/Layout/Layout";
//import Theme from './Theme';
import { MuiThemeProvider } from "@material-ui/core/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import { lime, blue } from "@material-ui/core/colors";

const App = () => {
  const [darkState, setDarkState] = useState(false);
  const palletType = darkState ? "dark" : "light";

  const toggleMode = () => {
    setDarkState(!darkState);
  };

  const theme = createMuiTheme({
    palette: {
      type: palletType,
      primary: {
        light: blue[500],
        main: blue[700],
        dark: blue[900],
        contrastText: "#ffffff",
      },
      secondary: {
        light: lime[200],
        main: lime[300],
        dark: lime[400],
        contrastText: "#ffffff",
      },
      // Used by `getContrastText()` to maximize the contrast between
      // the background and the text.
      contrastThreshold: 5,
      // Used by the functions below to shift a color's luminance by approximately
      // two indexes within its tonal palette.
      tonalOffset: 0.5,
    },
  });

  return (
    <MuiThemeProvider theme={theme}>
      <Layout darkMode={toggleMode} />
    </MuiThemeProvider>
  );
};

export default App;
