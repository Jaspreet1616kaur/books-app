import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function NavBar() {
  const { logout, user } = useAuth();
  console.log("dbUsersNavbar: ", user);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="primary"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            BOOKS
          </Typography>

          {user && (
            <Button color="inherit">
              <Link to="/login">Login</Link>
            </Button>
          )}
          <Button color="inherit">
            {" "}
            <Link to="/register">SIGNUP</Link>
          </Button>
          <Button color="inherit">
            {" "}
            <Link to="/Insert">INSERT</Link>
          </Button>
          {user && (
            <Button onClick={logout} color="inherit">
              {" "}
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
