import React from "react";
import { Link } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
// import SearchIcon from "@mui/icons-material/Search";
// import Link from "@mui/material/Link";

function Header() {
  return (
    <div>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="search"
            component={Link}
            to="/"
          >
            <MenuIcon />
          </IconButton>
          <Typography 
            variant="h5" 
            color="inherit" 
            sx={{ mr: 1 }} 
            noWrap
          >
            Pla search
          </Typography>
          <Typography 
            style={{ fontSize: 12 }} 
            sx={{ flexGrow: 1 }}
            color="inherit" 
            noWrap
          >
            ‐プラサーチ‐
          </Typography>
          <Button component={Link} to="/" color="inherit">
            Home
          </Button>
          <Button component={Link} to="/about" color="inherit">
            About
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;
