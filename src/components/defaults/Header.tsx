import * as React from "react";
import { Link } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import SearchIcon from "@mui/icons-material/Search";
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
            <SearchIcon />
          </IconButton>
          <Typography variant="h5" color="inherit" sx={{ mr: 1 }} noWrap>
            Pla search
          </Typography>
          <Typography style={{ fontSize: 12 }} color="inherit" noWrap>
            ‐プラサーチ‐
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;
