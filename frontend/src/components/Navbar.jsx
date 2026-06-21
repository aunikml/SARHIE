import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import MenuIcon from "@mui/icons-material/Menu";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

const sections = [
  { label: "Home", id: "hero" },
  { label: "About", id: "about" },
  { label: "Agenda", id: "agenda" },
  { label: "Partners", id: "partners" },
  { label: "Team", id: "team" },
];

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const scrollTo = (id) => {
    setDrawerOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <AppBar position="fixed" color="primary" elevation={1}>
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
          <Box
            component="span"
            sx={{ fontWeight: 700, fontSize: "1.15rem", letterSpacing: "-0.5px", cursor: "pointer" }}
            onClick={() => scrollTo("hero")}
          >
            SARHIE
          </Box>
          {isMobile ? (
            <>
              <IconButton color="inherit" onClick={() => setDrawerOpen(true)}>
                <MenuIcon />
              </IconButton>
              <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
                <Box sx={{ width: 250, pt: 2 }}>
                  <List>
                    {sections.map((s) => (
                      <ListItem key={s.id} disablePadding>
                        <ListItemButton onClick={() => scrollTo(s.id)}>
                          {s.label}
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </Drawer>
            </>
          ) : (
            <Box sx={{ display: "flex", gap: 1 }}>
              {sections.map((s) => (
                <Button key={s.id} color="inherit" onClick={() => scrollTo(s.id)} sx={{ fontWeight: 500 }}>
                  {s.label}
                </Button>
              ))}
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
