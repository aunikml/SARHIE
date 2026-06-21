import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { motion } from "framer-motion";
import { crud } from "../api";

const sections = [
  { label: "Team Members", endpoint: "team-members", color: "#1B3A5C" },
  { label: "Partners", endpoint: "partners", color: "#E8A838" },
  { label: "Initiatives", endpoint: "initiatives", color: "#2E7D32" },
  { label: "Events", endpoint: "events", color: "#C62828" },
  { label: "Highlights", endpoint: "highlights", color: "#6A1B9A" },
];

export default function Dashboard() {
  const [counts, setCounts] = useState({});

  useEffect(() => {
    sections.forEach((s) => {
      crud(s.endpoint).list().then((data) => {
        setCounts((prev) => ({ ...prev, [s.endpoint]: data.length }));
      }).catch(() => {});
    });
  }, []);

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
        Dashboard
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Overview of your content
      </Typography>
      <Grid container spacing={3}>
        {sections.map((s, i) => (
          <Grid item xs={12} sm={6} md={4} key={s.endpoint}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
              <Card sx={{ borderTop: `4px solid ${s.color}` }}>
                <CardContent>
                  <Typography variant="h3" sx={{ fontWeight: 800, color: s.color }}>
                    {counts[s.endpoint] ?? "..."}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {s.label}
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
