import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "../styles/theme";
import "../styles/globals.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Provider } from "react-redux";
import store from "../redux/store"; 
import { AppProps } from "next/app";
import 'regenerator-runtime/runtime';


function App({ Component, pageProps }) {
  return (
    <>
      <GoogleOAuthProvider clientId="303405332985-lleqju488en3mjv74rhb49k10um5a5cp.apps.googleusercontent.com">
        <Provider store={store}>
          {" "}
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Component {...pageProps} />{" "}
          </ThemeProvider>
        </Provider>
      </GoogleOAuthProvider>
    </>
  );
}

export default App;

