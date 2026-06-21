import { useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { motion, useInView } from "framer-motion";
import GroupsIcon from "@mui/icons-material/Groups";
import SchoolIcon from "@mui/icons-material/School";
import PublicIcon from "@mui/icons-material/Public";

const highlights = [
  { icon: <GroupsIcon fontSize="large" />, label: "Founding Members", value: "9" },
  { icon: <SchoolIcon fontSize="large" />, label: "Partner Institutions", value: "7+" },
  { icon: <PublicIcon fontSize="large" />, label: "Countries", value: "5" },
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <Box id="about" sx={{ py: { xs: 8, md: 12 }, bgcolor: "background.default" }}>
      <Container maxWidth="lg">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <Typography variant="h2" color="primary" gutterBottom>
            About SARHIE
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 800, mb: 6, fontSize: "1.1rem" }}>
            The South Asia Research Hub for Inclusive Education seeks to forge and take forward collaboration on school
            and teacher education within the region. The research hub is a collective bringing together academics,
            practitioners and policy-makers working on inclusive education from the region.
          </Typography>
        </motion.div>

        <Grid container spacing={3} sx={{ mb: 6 }}>
          {highlights.map((h, i) => (
            <Grid item xs={12} md={4} key={i}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.15 }}
              >
                <Card sx={{ textAlign: "center", py: 3 }}>
                  <CardContent>
                    <Box sx={{ color: "secondary.main", mb: 1 }}>{h.icon}</Box>
                    <Typography variant="h3" color="primary" sx={{ fontWeight: 800 }}>
                      {h.value}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {h.label}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
