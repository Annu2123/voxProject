import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import { Outlet, useNavigate } from "react-router";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import TtyIcon from '@mui/icons-material/Tty';
import PeopleIcon from '@mui/icons-material/People';
import { Toaster } from "react-hot-toast";
import { Avatar, Menu, MenuItem, Switch, Tooltip } from "@mui/material";
import Logout from "@mui/icons-material/Logout";
import { useSelector } from "react-redux";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));





export default function Navbar() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [checked, setChecked] = React.useState(false);
  const role = localStorage.getItem('roles');
  console.log("Role:", role);
  let navbarItems;

  if (role === 'admin') {
    navbarItems = [
      {
        icon: <DashboardIcon sx={{ color: "black" }} />,
        title: "Dashboard",
        route: "dashboard",
      },
      {
        icon: <HealthAndSafetyIcon sx={{ color: "black" }} />,
        title: "Consultation",
        route: "consultation",
      },
      {
        icon: <ManageAccountsIcon sx={{ color: "black" }} />,
        title: "Manage patient",
        route: "manage_patient",
      },
      {
        icon: <AssignmentIndIcon sx={{ color: "black" }} />,
        title: "Consultation Settings",
        route: "consultation_settings",
      },
      {
        icon:<PeopleIcon sx={{ color: "black" }}/>,
        title:"Users",
        route:"users",
      },
      {
        icon:<TtyIcon sx={{ color: "black" }}/>,
        title:"Call Activity",
        route:"call_activity",
      }
    ];
  } else if (role === 'user') {
    navbarItems = [
      {
        icon: <DashboardIcon sx={{ color: "black" }} />,
        title: "Dashboard",
        route: "dashboard",
      },
      {
        icon: <HealthAndSafetyIcon sx={{ color: "black" }} />,
        title: "Consultation",
        route: "consultation",
      },
      {
        icon: <ManageAccountsIcon sx={{ color: "black" }} />,
        title: "Manage patient",
        route: "manage_patient",
      },
      {
        icon: <AssignmentIndIcon sx={{ color: "black" }} />,
        title: "Consultation Settings",
        route: "consultation_settings",
      },
    ];
  }
  console.log(navbarItems)
  const [anchorEl, setAnchorEl] = React.useState(null);
  const profileOpen = Boolean(anchorEl);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem('fname');
    localStorage.removeItem('lname');
    localStorage.removeItem('roles');
    localStorage.removeItem('email_id' );
    localStorage.removeItem('telephone_ext');
    sessionStorage.removeItem('msg_queue_id');
    navigate("/signIn");
  };

  console.log(sessionStorage.getItem('msg_queue_id'))
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleItemClick = (route) => {
    navigate(`${route}`);
  };

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <Box sx={{ display: "flex", width: "100%" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        open={open}
        sx={{
          backgroundColor: "#FAFAFA",
          boxShadow: "none",
          borderBottom: "1px solid lightgray",
          "& .MuiPaper-elevation": { boxShadow: "none" },
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
              color: "black",
            }}
          >
            <MenuIcon />
          </IconButton>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Typography
              variant="subtitle2"
              sx={{
                display: "flex",
                backgroundColor: checked ? "#00b4d8" : "red",
                fontWeight: "bold",
                width: "60px",
                borderRadius: "8px",
                justifyContent: "center",
                mt: 1,
                color: "white",
              }}
            >
              {checked ? "Online" : "Offline"}
            </Typography>
            <Switch
              checked={checked}
              onChange={handleChange}
              inputProps={{ "aria-label": "controlled" }}
            />
            <Tooltip title="Account settings">
              <IconButton
                onClick={handleProfileClick}
                size="small"
                // sx={{ ml: 2 }}
                aria-controls={profileOpen ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={profileOpen ? "true" : undefined}
              >
                <Avatar
                  alt="Voxpro solutions"
                  src="/"
                  sx={{ backgroundColor: "#f78888", cursor: "pointer" }}
                />
              </IconButton>
            </Tooltip>
          </Box>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={profileOpen}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 55,
                  height: 53,
                  ml: -0.5,
                  mr: 1,
                },
                "&::before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem>
              <ListItemIcon>
                <Avatar
                  alt="Voxpro solutions"
                  src="/"
                  sx={{
                    backgroundColor: "#f78888",
                    cursor: "pointer",
                    fontSize: "24px",
                  }}
                />
              </ListItemIcon>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography sx={{ fontSize: "18px" }} fontWeight={650}>
                  Voxpro Solutions
                </Typography>
                <Typography sx={{ fontSize: "12px" }}>
                  voxprosolution@gmail.com
                </Typography>
              </Box>
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <Logout fontSize="13px" />
              </ListItemIcon>
              <Typography sx={{ fontSize: "13px" }}> Logout </Typography>
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader sx={{ backgroundColor: "#FAFAFA" }}>
          <Box sx={{ display: "flex", justifyContent: "center", mr: 6 }}>
            <Typography variant="subtitle1">KOSHYS</Typography>
          </Box>

          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List sx={{ backgroundColor: "#FAFAFA" }}>
          {navbarItems?.map((item, i) => (
            <Tooltip key={i} title={open ? "" : item.title} placement="right">
              <ListItem key={i} disablePadding sx={{ display: "block" }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    //   px: 2.5,
                  }}
                  onClick={() => handleItemClick(item.route)}
                >
                  <ListItemIcon
                    sx={{
                      mr: open ? 2 : "auto",
                      justifyContent: "center",
                      "& .MuiSvgIcon-root": {
                        fontSize: "18px",
                      },
                      "&.MuiListItemIcon-root ": {
                        marginRight: "-12px",
                      },
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primaryTypographyProps={{ fontSize: "13px" }}
                    primary={item.title}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            </Tooltip>
          ))}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: { lg: "60px", xs: "56px" },
          backgroundColor: "#F8F9FE",
          minHeight: "90vh",
        }}
      >
        <Outlet />
        <Toaster position="top-right" />
      </Box>
    </Box>
  );
}
