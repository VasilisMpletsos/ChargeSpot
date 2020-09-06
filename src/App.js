import React , { useState , useEffect } from 'react';
import Layout from './containers/Layout/Layout';
//import Theme from './Theme';
import { MuiThemeProvider } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { createMuiTheme } from '@material-ui/core/styles';
import { purple , lime , blueGrey } from '@material-ui/core/colors';
import createPalette from '@material-ui/core/styles/createPalette';

const App = () => {

  const [darkState, setDarkState] = useState(false);
  const palletType = darkState ? "dark" : "light";

  const toggleMode = () => {
    setDarkState(!darkState);
  }

  const theme = createMuiTheme({
    palette: {
      type: palletType,
      primary: {
        light: purple[200],
        main: purple[700],
        dark: purple[900],
      },
      secondary: {
        light: lime[200],
        main: lime[300],
        dark: blueGrey[900],
      },
      // Used by `getContrastText()` to maximize the contrast between
      // the background and the text.
      contrastThreshold: 4,
      // Used by the functions below to shift a color's luminance by approximately
      // two indexes within its tonal palette.
      tonalOffset: 1,
    },
  });


  return (
      <MuiThemeProvider theme={theme}>
        <Paper>
          <Layout darkMode={toggleMode}/>
        </Paper>
      </MuiThemeProvider>
  );
}

export default App;
