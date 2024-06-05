import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { deleteUser } from "../../utils/api_users"; // Ensure you have this function
import { useSnackbar } from "notistack";

export default function UserTable({ users }) {
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();

  const deleteUserMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      enqueueSnackbar("User is deleted", {
        variant: "success",
      });
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
    onError: (error) => {
      enqueueSnackbar(error.response.data.message, {
        variant: "error",
      });
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
  });

  const handleUserDelete = (userId) => {
    const confirm = window.confirm("Are you sure you want to delete this user?");
    if (confirm) {
      deleteUserMutation.mutate(userId);
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user._id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell align="right">
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleUserDelete(user._id)}
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
