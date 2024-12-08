import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import InventoryIcon from "@mui/icons-material/Inventory";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import FiberNewIcon from "@mui/icons-material/FiberNew";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import Inventory from "./Inventory";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;

function ResponsiveDrawer({ children, window }) {
  let navigate = useNavigate();
  // const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const logout = () => {
    localStorage.setItem("token", "");
    localStorage.setItem("role", "");
    navigate("/");
  };
  const role = localStorage.getItem("role");
  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        <ListItem key={"Orders"} disablePadding>
          <ListItemButton onClick={() => navigate("/order")}>
            <ListItemIcon>
              {" "}
              <DeliveryDiningIcon />{" "}
            </ListItemIcon>
            <ListItemText primary={"Orders"} />
          </ListItemButton>
        </ListItem>
        <ListItem key={"New order"} disablePadding>
          <ListItemButton onClick={() => navigate("/neworder")}>
            <ListItemIcon>
              <FiberNewIcon />
            </ListItemIcon>
            <ListItemText primary={"New order"} />
          </ListItemButton>
        </ListItem>
        {role === "admin" ||
          (role === "supplier" && (
            <>
              <ListItem key={"Products"} disablePadding>
                <ListItemButton onClick={() => navigate("/inventory")}>
                  <ListItemIcon>
                    <InventoryIcon />{" "}
                  </ListItemIcon>
                  <ListItemText primary={"Products"} />
                </ListItemButton>
              </ListItem>
              <ListItem key={"Charts"} disablePadding>
                <ListItemButton onClick={() => navigate("/Charts")}>
                  <ListItemIcon>
                    <InsertChartIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Charts"} />
                </ListItemButton>
              </ListItem>
            </>
          ))}
      </List>
    </div>
  );

  // Remove this const when copying and pasting into your project.
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Supply chain analytics
          </Typography>

          <Button
            color="white"
            variant="text"
            sx={{ marginLeft: 5 }}
            onClick={logout}
          >
            Log out
          </Button>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        height="92vh"
        overflow="hidden"
        sx={{ width: "100%", padding: 5 }}
      >
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            overflowY: "auto",
          }}
        >
          <Box
            component="main"
            sx={{
              flex: 1,
              p: 3,
            }}
          >
            {children}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * Remove this when copying and pasting into your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;
