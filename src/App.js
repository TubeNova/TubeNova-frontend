import { ThemeProvider, styled } from "styled-components";
import Router from "./Router";
import { GlobalStyles } from "./styles/GlobalStyles";
import { theme } from "./styles/Theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Router />
    </ThemeProvider>
  );
}

export default App;
