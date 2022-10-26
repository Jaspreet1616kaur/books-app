import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Badge from "@mui/material/Badge";
import ShoppingBasket from "@mui/icons-material/ShoppingBasket";

export default function NavBar() {
  const { logout, user, dbUsers } = useAuth();
  console.log("test");
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ background: "#e63946" }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {/* <Button color="inherit" href="/"> */}
            <h2 style={{ color: "black" }}>Historical BOOKS</h2>
            {/* </Button> */}
          </Typography>

          {!user && (
            <>
              <Button color="inherit" href="/login">
                <h3 style={{ color: "black" }}>Login</h3>
                {/* <Link to="/login">Login</Link> */}
              </Button>
              <Button color="inherit" href="/register">
                <h3 style={{ color: "black" }}>SIGNUP</h3>
                {/* <Link to="/register">SIGNUP</Link> */}
              </Button>
            </>
          )}
          {dbUsers && (
            <Link to="/cart">
              <Badge badgeContent={dbUsers.cart.length} color="primary">
                <ShoppingBasket color="action" />
              </Badge>
            </Link>
          )}

          {user && (
            <Button color="inherit" href="/insert">
              <h3 style={{ color: "black" }}>Insert</h3>
            </Button>
          )}
          {user && (
            <Button onClick={logout} color="inherit">
              <h3 style={{ color: "black" }}>Logout</h3>
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
