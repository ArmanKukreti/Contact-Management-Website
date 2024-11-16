import React, { useContext, useState } from "react";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from "react-router-dom";
import ImportContactsIcon from "@mui/icons-material/ImportContacts";
import MenuIcon from "@mui/icons-material/Menu";
import { UserContext } from "../context/userContext";

const navLinks = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "About",
    path: "/#about",
  },
];

const Navbar = () => {
  const [anchorNav, setAnchorNav] = useState(null);
  const { currentUser } = useContext(UserContext);

  const openMenu = (e) => {
    setAnchorNav(e.currentTarget);
  };

  const closeMenu = () => {
    setAnchorNav(null);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        {/* Logo */}
        <IconButton
          size="large"
          edge="start"
          component={Link}
          to="/"
          color="inherit"
          aria-label="logo"
        >
          <ImportContactsIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          ContactBook
        </Typography>

        {/* Desktop Navigation */}
        <Box sx={{ display: { xs: "none", md: "flex" } }}>
          {navLinks.map((link) => (
            <Button color="inherit" component={Link} key={link} to={link.path}>
              {link.name}
            </Button>
          ))}

          {currentUser ? (
            <>
            <IconButton component={Link} to="/dashboard">
              <Tooltip title={`Welcome, ${currentUser.firstName + " " + currentUser.lastName}`} arrow>
                <Avatar
                  alt={currentUser.name}
                  src={currentUser.avatarUrl}
                  sx={{ width: 30, height: 30 }}
                />
              </Tooltip>
            </IconButton>
            <IconButton component={Link} to="/logout">
              <Tooltip title="Logout" arrow>
                  <LogoutIcon sx={{color: "white"}}/>
              </Tooltip>
            </IconButton>
            </>      
          ) : (
            <Button color="inherit" component={Link} to="/register">
              Register
            </Button>
          )}
        </Box>

        {/* Mobile Navigation */}
        <Box sx={{ display: { xs: "flex", md: "none" } }}>
          <IconButton
            size="large"
            color="inherit"
            aria-label="menu"
            onClick={openMenu}
          >
            <MenuIcon />
          </IconButton>

          <Menu
            anchorEl={anchorNav}
            open={Boolean(anchorNav)}
            onClose={closeMenu}
          >
            {navLinks.map((link) => (
              <MenuItem key={link} onClick={closeMenu}>
                {link}
              </MenuItem>
            ))}

            {currentUser ? (
              <MenuItem onClick={closeMenu} component={Link} to="/dashboard">
                Dashboard
              </MenuItem>
            ) : (
              <MenuItem onClick={closeMenu} component={Link} to="/register">
                Register
              </MenuItem>
            )}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
