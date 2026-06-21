import { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { motion, useInView } from "framer-motion";
import SchoolIcon from "@mui/icons-material/School";
import GroupsIcon from "@mui/icons-material/Groups";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
import { getInitiatives } from "../api";

const iconMap = {
  School: <SchoolIcon sx={{ fontSize: 40 }} />,
  Groups: <GroupsIcon sx={{ fontSize: 40 }} />,
  RecordVoiceOver: <RecordVoiceOverIcon sx={{ fontSize: 40 }} />,
};

export default function Agenda() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [items, setItems] = useState([]);

  useEffect(() => {
    getInitiatives().then(setItems).catch(() => {});
  }, []);

  return (
    <Box id="agenda" sx={{ py: { xs: 8, md: 12 }, bgcolor: "primary.main", color: "white" }}>
      <Container maxWidth="lg">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <Typography variant="h2" gutterBottom sx={{ color: "#fff" }}>
            Our Agenda
          </Typography>
          <Typography variant="body1" sx={{ mb: 6, maxWidth: 700, color: "rgba(255,255,255,0.75)", fontSize: "1.1rem" }}>
            The hub convenes webinars and research-sharing sessions, offers an online certificate course for educators,
            and fosters collaborative research and writing initiatives across the region.
          </Typography>
        </motion.div>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "repeat(2, 1fr)", sm: "repeat(3, 1fr)" },
            gap: 4,
          }}
        >
          {(items.length > 0 ? items : [
            { title: "Online Certificate Course", description: "An online certificate course for educators in the South Asian region, focusing on inclusive education practices and policies.", icon: "School" },
            { title: "Collaborative Writing Initiatives", description: "Members collaborate on research and writing, bringing together experiences and promising practices related to teacher education, school education and policies for inclusion.", icon: "Groups" },
            { title: "Webinars & Research Sharing", description: "The hub convenes webinars and research-sharing sessions occasionally, fostering dialogue among academics, practitioners and policy-makers.", icon: "RecordVoiceOver" },
          ]).map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.15 }}
            >
              <Card
                sx={{
                  height: "100%",
                  bgcolor: "rgba(255,255,255,0.07)",
                  backdropFilter: "blur(8px)",
                  color: "white",
                  border: "1px solid rgba(255,255,255,0.1)",
                  transition: "transform 0.3s, box-shadow 0.3s",
                  "&:hover": { transform: "translateY(-6px)", boxShadow: "0 12px 40px rgba(0,0,0,0.3)" },
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Box sx={{ color: "secondary.main", mb: 2 }}>
                    {iconMap[item.icon] || <SchoolIcon sx={{ fontSize: 40 }} />}
                  </Box>
                  <Typography variant="h4" gutterBottom sx={{ color: "#fff" }}>
                    {item.title}
                  </Typography>
                  <Typography variant="body1" sx={{ color: "rgba(255,255,255,0.75)" }}>
                    {item.description}
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
