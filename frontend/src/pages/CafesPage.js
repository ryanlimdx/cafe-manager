// Page to display all cafes, with options to add, edit, and delete cafes
import React from "react";
import { useCafes, useDeleteCafe } from "../api/cafes";
import { Box, Button, Container, Typography } from "@mui/material";
import CafeTable from "../components/CafesTable";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

const CafesPage = () => {
  const { data: cafes = [], isLoading } = useCafes();
  const deleteCafe = useDeleteCafe();
  const navigate = useNavigate();

  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [cafeToDelete, setCafeToDelete] = useState(null);

  // Handle delete confirmation
  const handleDeleteConfirm = (id) => {
    setCafeToDelete(id);
    setOpenConfirmDialog(true);
  };

  // Handle actual deletion
  const handleDelete = () => {
    deleteCafe.mutate(cafeToDelete);
    setOpenConfirmDialog(false);
  };

  if (isLoading) return <Container><div>Loading...</div></Container>;

  return (
    <Container>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        marginBottom="20px"
      >
        <Typography variant="h5">
        Cafés
        </Typography>
        <Button
          color="primary"
          variant="contained"
          aria-label="add"
          onClick={() => {
            navigate({ to: "/add-cafe" });
          }}
          style={{
            paddingLeft: '20px',
            paddingRight: '20px',
            textTransform: 'none' 
          }}
        >
          + New Café
        </Button>
      </Box>

      <CafeTable
        cafes={cafes}
        onEdit={(cafe) => navigate({ to: `/edit-cafe/${cafe.id}` })}
        onDelete={handleDeleteConfirm}
      />

      {/* Confirm Delete Dialog */}
      <Dialog
        open={openConfirmDialog}
        onClose={() => setOpenConfirmDialog(false)}
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this café?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirmDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="secondary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default CafesPage;
