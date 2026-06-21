import { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { motion, useInView } from "framer-motion";
import GroupsIcon from "@mui/icons-material/Groups";
import SchoolIcon from "@mui/icons-material/School";
import PublicIcon from "@mui/icons-material/Public";
import { getAboutContent } from "../api";

const iconMap = {
  Groups: <GroupsIcon fontSize="large" />,
  School: <SchoolIcon fontSize="large" />,
  Public: <PublicIcon fontSize="large" />,
};

const fallback = {
  title: "About SARHIE",
  description: "The South Asia Research Hub for Inclusive Education seeks to forge and take forward collaboration on school and teacher education within the region. The research hub is a collective bringing together academics, practitioners and policy-makers working on inclusive education from the region.",
  highlights: [
    { label: "Founding Members", value: "9", icon_name: "Groups" },
    { label: "Partner Institutions", value: "7+", icon_name: "School" },
    { label: "Countries", value: "5", icon_name: "Public" },
  ],
};

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [content, setContent] = useState(null);

  useEffect(() => {
    getAboutContent().then(setContent).catch(() => {});
  }, []);

  const data = content || fallback;

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
            {data.title}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 800, mb: 6, fontSize: "1.1rem" }}>
            {data.description}
          </Typography>
        </motion.div>

        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "repeat(2, 1fr)", sm: "repeat(3, 1fr)" }, gap: 3 }}>
          {(data.highlights || []).map((h, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.15 }}
            >
              <Card sx={{ textAlign: "center", py: 3 }}>
                <CardContent>
                  <Box sx={{ color: "secondary.main", mb: 1 }}>
                    {iconMap[h.icon_name] || <GroupsIcon fontSize="large" />}
                  </Box>
                  <Typography variant="h3" color="primary" sx={{ fontWeight: 800 }}>
                    {h.value}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {h.label}
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
