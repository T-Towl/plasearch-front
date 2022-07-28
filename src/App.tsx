import React from 'react';
import './App.css';
import Header from "./components/defaults/Header";
import Footer from "./components/defaults/Footer";
import Main from "./components/Main";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Main />
      <Footer />
    </ThemeProvider>
  );
}
