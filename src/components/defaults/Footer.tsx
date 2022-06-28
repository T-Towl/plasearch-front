import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      {new Date().getFullYear()}{" "}
      <Link color="inherit" href="">
        Tsuji
      </Link>
      {"."}
    </Typography>
  );
}

function Footer() {
  return (
    <div>
      <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Pla search ‐プラサーチ‐
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Let's build a Gunpla!!
        </Typography>
        <Copyright />
      </Box>
    </div>
  );
}

export default Footer;
