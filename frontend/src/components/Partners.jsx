import { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Chip from "@mui/material/Chip";
import { motion, useInView } from "framer-motion";
import { getPartners } from "../api";

export default function Partners() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [partners, setPartners] = useState([]);

  useEffect(() => {
    getPartners().then(setPartners).catch(() => {});
  }, []);

  const list = partners.length > 0 ? partners : [
    "Royal University of Bhutan",
    "Tata Institute of Social Sciences, India",
    "National Institute of Advanced Studies, India",
    "Kathmandu University, Nepal",
    "University of Colombo, Sri Lanka",
    "Center for the Study of International Cooperation in Education (CICE)",
    "The IDEC Institute, Hiroshima University",
  ];

  return (
    <Box id="partners" sx={{ py: { xs: 8, md: 12 }, bgcolor: "background.default" }}>
      <Container maxWidth="lg">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <Typography variant="h2" color="primary" gutterBottom>
            Partner Institutions
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 6, maxWidth: 700, fontSize: "1.1rem" }}>
            Current partners across South Asia and beyond, collaborating on inclusive education research and practice.
          </Typography>
        </motion.div>

        <Grid container spacing={2} justifyContent="center">
          {list.map((p, i) => (
            <Grid item key={i}>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: i * 0.06 }}
              >
                <Chip
                  label={typeof p === "string" ? p : p.name}
                  variant="outlined"
                  sx={{
                    p: 2.5,
                    fontSize: "0.95rem",
                    fontWeight: 500,
                    borderColor: "primary.main",
                    color: "primary.main",
                    "&:hover": { bgcolor: "primary.main", color: "#fff" },
                    transition: "all 0.2s",
                  }}
                />
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
