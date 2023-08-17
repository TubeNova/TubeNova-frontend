import { ThemeProvider, styled } from "styled-components";
import Router from "./Router";
import { GlobalStyles } from "./styles/GlobalStyles";
import { theme } from "./styles/Theme";
import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Router />
    </ThemeProvider>
  );
}

export default App;
