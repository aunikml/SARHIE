import { useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import { motion } from "framer-motion";
import { login } from "../api";

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(username, password);
      onLogin();
    } catch {
      setError("Invalid credentials");
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", bgcolor: "#1B3A5C" }}>
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Card sx={{ width: 400, p: 2 }}>
          <CardContent>
            <Typography variant="h4" color="primary" gutterBottom sx={{ textAlign: "center", fontWeight: 700 }}>
              SARHIE Admin
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ textAlign: "center", mb: 3 }}>
              Sign in to manage content
            </Typography>
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            <Box component="form" onSubmit={handleSubmit}>
              <TextField label="Username" fullWidth sx={{ mb: 2 }} value={username} onChange={(e) => setUsername(e.target.value)} required />
              <TextField label="Password" type="password" fullWidth sx={{ mb: 3 }} value={password} onChange={(e) => setPassword(e.target.value)} required />
              <Button type="submit" variant="contained" color="secondary" fullWidth size="large">
                Sign In
              </Button>
            </Box>
          </CardContent>
        </Card>
      </motion.div>
    </Box>
  );
}
