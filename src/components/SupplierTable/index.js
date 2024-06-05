import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { deleteSupplier } from "../../utils/api_suppliers";
import { useSnackbar } from "notistack";

export default function SupplierTable({ suppliers }) {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  const [user, setUser] = useState(null); // State to store user data

  const deleteSupplierMutation = useMutation({
    mutationFn: deleteSupplier,
    onSuccess: () => {
      enqueueSnackbar("Supplier is deleted", {
        variant: "success",
      });
      queryClient.invalidateQueries({
        queryKey: ["suppliers"],
      });
    },
    onError: (error) => {
      enqueueSnackbar(error.response.data.message, {
        variant: "error",
      });
      queryClient.invalidateQueries({
        queryKey: ["suppliers"],
      });
    },
  });

  const handleSupplierDelete = (supplierId) => {
    const confirm = window.confirm("Are you sure you want to delete this supplier?");
    if (confirm) {
      deleteSupplierMutation.mutate(supplierId);
    }
  };

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {suppliers.map((supplier) => (
            <TableRow key={supplier._id}>
              <TableCell>{supplier.name}</TableCell>
              <TableCell>{supplier.email}</TableCell>
              <TableCell>{supplier.phone}</TableCell>
              <TableCell>{supplier.category}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="primary"
                  disabled={!(user && user.role === "admin")} // Disable edit for non-admins
                  onClick={() => {
                    navigate("/suppliers/" + supplier._id);
                  }}
                  sx={{ marginRight: 1 }}
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  disabled={!(user && user.role === "admin")} // Disable delete for non-admins
                  onClick={() => handleSupplierDelete(supplier._id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
