import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { motion } from "framer-motion";

const titleWords = "SARHIE".split("");
const tagline =
  "The South Asia Research Hub for Inclusive Education";

export default function Hero() {
  const [showSub, setShowSub] = useState(false);
  const [showCTA, setShowCTA] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setShowSub(true), 1600);
    const t2 = setTimeout(() => setShowCTA(true), 2800);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <Box
      id="hero"
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        background: "linear-gradient(135deg, #1B3A5C 0%, #0F2440 50%, #1B3A5C 100%)",
        color: "white",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2 }}>
        <Box sx={{ maxWidth: 800 }}>
          <Box sx={{ display: "flex", gap: { xs: 0.5, sm: 1 }, mb: 2, flexWrap: "wrap" }}>
            {titleWords.map((letter, i) => (
              <motion.span
                key={i}
                initial={{ y: 80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: i * 0.12, ease: "easeOut" }}
                style={{
                  fontSize: "clamp(3rem, 10vw, 6rem)",
                  fontWeight: 800,
                  color: i === 1 || i === 5 ? "#E8A838" : "#fff",
                  display: "inline-block",
                }}
              >
                {letter}
              </motion.span>
            ))}
          </Box>

          {showSub && (
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <Typography
                variant="h5"
                sx={{ fontWeight: 300, mb: 1, color: "rgba(255,255,255,0.85)", letterSpacing: "0.5px" }}
              >
                {tagline}
              </Typography>
            </motion.div>
          )}

          {showCTA && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Typography
                variant="body1"
                sx={{ mb: 4, color: "rgba(255,255,255,0.7)", maxWidth: 600, fontSize: "1.1rem" }}
              >
                Forging collaboration on school and teacher education across South Asia — a collective of academics, practitioners, and policy-makers.
              </Typography>
              <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
                >
                  Learn More
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  sx={{ color: "white", borderColor: "rgba(255,255,255,0.4)", "&:hover": { borderColor: "#E8A838", color: "#E8A838" } }}
                  onClick={() => document.getElementById("team")?.scrollIntoView({ behavior: "smooth" })}
                >
                  Meet the Team
                </Button>
              </Box>
            </motion.div>
          )}
        </Box>
      </Container>

      <Box
        component={motion.div}
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 60, ease: "linear" }}
        sx={{
          position: "absolute",
          right: "-10%",
          top: "50%",
          transform: "translateY(-50%)",
          width: 500,
          height: 500,
          borderRadius: "50%",
          border: "2px solid rgba(232,168,56,0.08)",
          pointerEvents: "none",
        }}
      />
      <Box
        component={motion.div}
        animate={{ rotate: -360 }}
        transition={{ repeat: Infinity, duration: 45, ease: "linear" }}
        sx={{
          position: "absolute",
          right: "-5%",
          top: "50%",
          transform: "translateY(-50%)",
          width: 350,
          height: 350,
          borderRadius: "50%",
          border: "1px solid rgba(232,168,56,0.06)",
          pointerEvents: "none",
        }}
      />
    </Box>
  );
}
