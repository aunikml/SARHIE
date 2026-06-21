import { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import EventNoteIcon from "@mui/icons-material/EventNote";
import HandshakeIcon from "@mui/icons-material/Handshake";
import PeopleIcon from "@mui/icons-material/People";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LogoutIcon from "@mui/icons-material/Logout";
import { motion } from "framer-motion";
import { logout } from "../api";

const drawerWidth = 260;

const navItems = [
  { label: "Dashboard", path: "/admin", icon: <DashboardIcon /> },
  { label: "Hero", path: "/admin/hero", icon: <HomeIcon /> },
  { label: "About", path: "/admin/about", icon: <InfoIcon /> },
  { label: "Agenda", path: "/admin/initiatives", icon: <EventNoteIcon /> },
  { label: "Partners", path: "/admin/partners", icon: <HandshakeIcon /> },
  { label: "Team", path: "/admin/team", icon: <PeopleIcon /> },
  { label: "Events", path: "/admin/events", icon: <CalendarMonthIcon /> },
];

export default function AdminLayout({ title, onNavigate, currentPath, onLogout, children }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const drawer = (
    <Box>
      <Box sx={{ p: 2.5, borderBottom: "1px solid", borderColor: "divider" }}>
        <Typography variant="h6" color="primary" sx={{ fontWeight: 700 }}>
          SARHIE Admin
        </Typography>
      </Box>
      <List sx={{ px: 1, py: 1 }}>
        {navItems.map((item) => (
          <ListItem key={item.path} disablePadding>
            <ListItemButton
              selected={currentPath === item.path}
              onClick={() => { onNavigate(item.path); setMobileOpen(false); }}
              sx={{ borderRadius: 2, mb: 0.5, "&.Mui-selected": { bgcolor: "primary.main", color: "white", "&:hover": { bgcolor: "primary.dark" } } }}
            >
              <ListItemIcon sx={{ minWidth: 40, color: currentPath === item.path ? "white" : undefined }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#f5f5f5" }}>
      <AppBar position="fixed" sx={{ width: { md: `calc(100% - ${drawerWidth}px)` }, ml: { md: `${drawerWidth}px` }, bgcolor: "white", color: "text.primary", boxShadow: "0 1px 4px rgba(0,0,0,0.08)" }}>
        <Toolbar>
          <IconButton edge="start" sx={{ mr: 2, display: { md: "none" } }} onClick={() => setMobileOpen(!mobileOpen)}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flex: 1, fontWeight: 600 }}>
            {title}
          </Typography>
          <Button color="inherit" startIcon={<LogoutIcon />} onClick={onLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Box component="nav" sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          sx={{ display: { xs: "block", md: "none" }, "& .MuiDrawer-paper": { width: drawerWidth } }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{ display: { xs: "none", md: "block" }, "& .MuiDrawer-paper": { width: drawerWidth, borderRight: "1px solid", borderColor: "divider" } }}
        >
          {drawer}
        </Drawer>
      </Box>

      <Box component="main" sx={{ flex: 1, p: 3, pt: { xs: 10, md: 10 } }}>
        <motion.div key={currentPath} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
          {children}
        </motion.div>
      </Box>
    </Box>
  );
}
