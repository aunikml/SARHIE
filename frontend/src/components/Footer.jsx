import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

export default function Footer() {
  return (
    <Box sx={{ bgcolor: "primary.dark", color: "rgba(255,255,255,0.7)", py: 6 }}>
      <Container maxWidth="lg">
        <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, justifyContent: "space-between", gap: 4, mb: 4 }}>
          <Box sx={{ maxWidth: 400 }}>
            <Typography variant="h5" sx={{ color: "#fff", fontWeight: 700, mb: 1 }}>
              SARHIE
            </Typography>
            <Typography variant="body2" sx={{ lineHeight: 1.7 }}>
              The South Asia Research Hub for Inclusive Education — forging collaboration on school and teacher education across the region.
            </Typography>
          </Box>
        </Box>
        <Divider sx={{ borderColor: "rgba(255,255,255,0.1)", mb: 3 }} />
        <Typography variant="body2" sx={{ textAlign: "center" }}>
          &copy; {new Date().getFullYear()} SARHIE. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
}
