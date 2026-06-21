import { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import { motion, useInView } from "framer-motion";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { getTeamMembers } from "../api";

function MemberCard({ member, index, inView }) {
  const [expanded, setExpanded] = useState(false);
  const initials = member.name
    .split(" ")
    .filter((w) => w.length > 0 && w[0] === w[0].toUpperCase())
    .slice(0, 2)
    .map((w) => w[0])
    .join("");

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      <Card
        sx={{
          height: "100%",
          cursor: "pointer",
          transition: "transform 0.3s, box-shadow 0.3s",
          "&:hover": { transform: "translateY(-4px)", boxShadow: "0 8px 30px rgba(0,0,0,0.1)" },
        }}
        onClick={() => setExpanded(!expanded)}
      >
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: expanded ? 2 : 0 }}>
            <Avatar sx={{ bgcolor: "secondary.main", width: 48, height: 48, fontWeight: 700, fontSize: "1rem" }}>
              {initials}
            </Avatar>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h4" sx={{ fontSize: "1.05rem" }}>
                {member.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {member.title}
              </Typography>
            </Box>
            <IconButton size="small" sx={{ color: "primary.main" }}>
              {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
          </Box>

          <Collapse in={expanded}>
            {member.affiliation && (
              <Typography variant="body2" color="primary" sx={{ mb: 1.5, fontWeight: 600 }}>
                {member.affiliation}
              </Typography>
            )}
            <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
              {member.bio}
            </Typography>
          </Collapse>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default function Team() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [members, setMembers] = useState([]);

  useEffect(() => {
    getTeamMembers().then(setMembers).catch(() => {});
  }, []);

  const fallback = [
    { name: "Prof. Mythili Ramchand", title: "Professor", affiliation: "National Institute of Advanced Studies, Bengaluru", bio: "Prof. Mythili Ramchand is currently with the National Institute of Advanced Studies, Bengaluru..." },
    { name: "Archana Mehendale", title: "Adjunct Professor", affiliation: "National Institute of Advanced Studies, Bengaluru, India", bio: "Archana Mehendale is an Adjunct Professor at the National Institute of Advanced Studies..." },
    { name: "Sonia Sawhney", title: "Assistant Professor", affiliation: "TISS Hyderabad", bio: "Sonia Sawhney is an Assistant Professor at TISS Hyderabad, specialising in inclusive education..." },
    { name: "Rinchen Dorji", title: "Pro-Vice Chancellor", affiliation: "Royal University of Bhutan", bio: "Rinchen Dorji is the Pro-Vice Chancellor, Academic and Research at the Royal University of Bhutan..." },
    { name: "Rebat Kumar Dhakal", title: "Assistant Professor & Head", affiliation: "Kathmandu University", bio: "Rebat is an Assistant Professor and Head of the Department of Educational Leadership..." },
    { name: "Prof. Manjula Vithanapathirana", title: "Chair Professor", affiliation: "University of Colombo, Sri Lanka", bio: "Manjula Vithanapathirana is a Chair Professor of Educational Psychology..." },
    { name: "Manjuma Akhtar Mousumi", title: "Assistant Professor", affiliation: "Hiroshima University, Japan", bio: "Manjuma Akhtar Mousumi is Assistant Professor at CICE, The IDEC Institute, Hiroshima University..." },
    { name: "Karma Jigyel, PhD", title: "Assistant Professor", affiliation: "Royal University of Bhutan", bio: "Karma Jigyel, PhD is an Assistant Professor at the Royal University of Bhutan..." },
    { name: "Karma Lhamo", title: "Lecturer", affiliation: "Paro College of Education, Bhutan", bio: "Karma Lhamo, a lecturer with a Master of Education in Special Education..." },
  ];

  return (
    <Box id="team" sx={{ py: { xs: 8, md: 12 }, bgcolor: "background.paper" }}>
      <Container maxWidth="lg">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <Typography variant="h2" color="primary" gutterBottom>
            Founding Members
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 6, maxWidth: 700, fontSize: "1.1rem" }}>
            The dedicated founding members driving SARHIE's mission across South Asia.
          </Typography>
        </motion.div>

        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "repeat(2, 1fr)", sm: "repeat(3, 1fr)" }, gap: 3 }}>
          {(members.length > 0 ? members : fallback).map((m, i) => (
            <MemberCard key={i} member={m} index={i} inView={inView} />
          ))}
        </Box>
      </Container>
    </Box>
  );
}
