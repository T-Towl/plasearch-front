import React from 'react';
import './App.css';
import Header from "./components/defaults/Header";
import Footer from "./components/defaults/Footer";
import Main from "./components/Main";
import Registration from './components/auth/Registration'
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Registration  />
      <Main />
      <Footer />
    </ThemeProvider>
  );
}
