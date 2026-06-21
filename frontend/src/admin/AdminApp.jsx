import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Login from "./Login";
import AdminLayout from "./AdminLayout";
import Dashboard from "./Dashboard";
import GenericAdmin from "./GenericAdmin";

const field = (label, field, opts = {}) => ({ label, field, ...opts });

const sections = {
  hero: {
    title: "Hero",
    endpoint: "hero",
    columns: [
      field("Acronym", "acronym"),
      field("Tagline", "tagline", { type: "textarea" }),
      field("CTA Label", "cta_primary_label", { label: "CTA Label" }),
    ],
  },
  about: {
    title: "About",
    endpoint: "about",
    columns: [
      field("Title", "title"),
      field("Description", "description", { type: "textarea", hidden: true }),
    ],
  },
  highlights: {
    title: "Highlights",
    endpoint: "highlights",
    columns: [
      field("Label", "label"),
      field("Value", "value"),
      field("Icon", "icon_name"),
      field("Order", "order", { type: "number" }),
    ],
  },
  initiatives: {
    title: "Agenda / Initiatives",
    endpoint: "initiatives",
    columns: [
      field("Title", "title"),
      field("Description", "description", { type: "textarea", hidden: true }),
      field("Icon", "icon"),
      field("Order", "order", { type: "number" }),
    ],
  },
  partners: {
    title: "Partners",
    endpoint: "partners",
    columns: [
      field("Name", "name"),
      field("Website", "website_url"),
      field("Order", "order", { type: "number" }),
    ],
  },
  "team-members": {
    title: "Team Members",
    endpoint: "team-members",
    columns: [
      field("Name", "name"),
      field("Title", "title"),
      field("Affiliation", "affiliation"),
      field("Order", "order", { type: "number" }),
    ],
  },
  events: {
    title: "Events",
    endpoint: "events",
    columns: [
      field("Title", "title"),
      field("Date", "date", { type: "date" }),
      field("Link", "link"),
    ],
  },
};

export default function AdminApp() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) setAuthenticated(true);
    const path = window.location.pathname;
    const match = path.match(/\/admin\/(.+)/);
    setPage(match ? match[1] : "");
    setLoading(false);
  }, []);

  const navigate = (path) => {
    window.history.pushState(null, "", path);
    const match = path.match(/\/admin\/(.+)/);
    setPage(match ? match[1] : "");
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setAuthenticated(false);
    navigate("/admin/login");
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!authenticated) {
    return <Login onLogin={() => { setAuthenticated(true); navigate("/admin"); }} />;
  }

  const currentPath = `/admin/${page}`;
  const section = sections[page];

  const renderPage = () => {
    if (!page || page === "login") {
      return <Dashboard />;
    }
    if (section) {
      return <GenericAdmin title={section.title} endpoint={section.endpoint} columns={section.columns} />;
    }
    return <Dashboard />;
  };

  return (
    <AdminLayout title={section?.title || "Dashboard"} onNavigate={navigate} currentPath={currentPath} onLogout={handleLogout}>
      {renderPage()}
    </AdminLayout>
  );
}
