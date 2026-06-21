import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import { motion } from "framer-motion";
import { crud } from "../api";

export default function GenericAdmin({ title, endpoint, columns }) {
  const [rows, setRows] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [form, setForm] = useState({});
  const [snack, setSnack] = useState(null);

  const api = crud(endpoint);

  const load = () => api.list().then(setRows).catch(() => {});

  useEffect(() => { load(); }, []);

  const openCreate = () => {
    const init = {};
    columns.forEach((c) => { if (!c.noField) init[c.field] = c.default || ""; });
    setForm(init);
    setEditItem(null);
    setDialogOpen(true);
  };

  const openEdit = (item) => {
    setForm({ ...item });
    setEditItem(item);
    setDialogOpen(true);
  };

  const handleSave = async () => {
    try {
      if (editItem) {
        await api.update(editItem.id, form);
        setSnack({ severity: "success", message: "Updated" });
      } else {
        await api.create(form);
        setSnack({ severity: "success", message: "Created" });
      }
      setDialogOpen(false);
      load();
    } catch {
      setSnack({ severity: "error", message: "Failed to save" });
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this item?")) return;
    try {
      await api.delete(id);
      setSnack({ severity: "success", message: "Deleted" });
      load();
    } catch {
      setSnack({ severity: "error", message: "Failed to delete" });
    }
  };

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>{title}</Typography>
        <Button variant="contained" color="secondary" startIcon={<AddIcon />} onClick={openCreate}>
          Add New
        </Button>
      </Box>

      <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: "#fafafa" }}>
              {columns.filter((c) => !c.hidden).map((c) => (
                <TableCell key={c.field} sx={{ fontWeight: 700 }}>{c.label}</TableCell>
              ))}
              <TableCell sx={{ fontWeight: 700 }} align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, i) => (
              <motion.tr
                key={row.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                style={{ display: "table-row" }}
              >
                {columns.filter((c) => !c.hidden).map((c) => (
                  <TableCell key={c.field}>
                    {c.render ? c.render(row[c.field], row) : (row[c.field] || "-")}
                  </TableCell>
                ))}
                <TableCell align="right">
                  <IconButton size="small" onClick={() => openEdit(row)}><EditIcon fontSize="small" /></IconButton>
                  <IconButton size="small" color="error" onClick={() => handleDelete(row.id)}><DeleteIcon fontSize="small" /></IconButton>
                </TableCell>
              </motion.tr>
            ))}
            {rows.length === 0 && (
              <TableRow>
                <TableCell colSpan={columns.filter((c) => !c.hidden).length + 1} align="center" sx={{ py: 4, color: "text.secondary" }}>
                  No items yet. Click "Add New" to create one.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{editItem ? "Edit" : "Create"} {title}</DialogTitle>
        <DialogContent>
          {columns.filter((c) => !c.noField && !c.hidden).map((c) => (
            <Box key={c.field} sx={{ mt: 2 }}>
              {c.type === "select" ? (
                <TextField
                  select
                  label={c.label}
                  fullWidth
                  value={form[c.field] || ""}
                  onChange={(e) => setForm({ ...form, [c.field]: e.target.value })}
                >
                  {c.options.map((o) => (
                    <MenuItem key={o.value} value={o.value}>{o.label}</MenuItem>
                  ))}
                </TextField>
              ) : c.type === "textarea" ? (
                <TextField
                  label={c.label}
                  fullWidth
                  multiline
                  rows={4}
                  value={form[c.field] || ""}
                  onChange={(e) => setForm({ ...form, [c.field]: e.target.value })}
                />
              ) : (
                <TextField
                  label={c.label}
                  fullWidth
                  type={c.type || "text"}
                  value={form[c.field] || ""}
                  onChange={(e) => setForm({ ...form, [c.field]: e.target.value })}
                />
              )}
            </Box>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" color="secondary" onClick={handleSave}>
            {editItem ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>

      {snack && (
        <Snackbar open autoHideDuration={3000} onClose={() => setSnack(null)} anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
          <Alert severity={snack.severity} sx={{ width: "100%" }}>{snack.message}</Alert>
        </Snackbar>
      )}
    </Box>
  );
}
