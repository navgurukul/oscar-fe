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
      <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
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

