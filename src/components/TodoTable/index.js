import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { deleteTodo } from "../../utils/api_todos"; // Ensure you have this function
import { useSnackbar } from "notistack";

export default function TodoTable({ todos }) {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();

  const [user, setUser] = useState(null); // State to store user data

  const deleteTodoMutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      enqueueSnackbar("Todo is deleted", {
        variant: "success",
      });
      queryClient.invalidateQueries({
        queryKey: ["todos"],
      });
    },
    onError: (error) => {
      enqueueSnackbar(error.response.data.message, {
        variant: "error",
      });
      queryClient.invalidateQueries({
        queryKey: ["todos"],
      });
    },
  });

  const handleTodoDelete = (todoId) => {
    const confirm = window.confirm("Are you sure you want to delete this todo?");
    if (confirm) {
      deleteTodoMutation.mutate(todoId);
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
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {todos.map((todo) => (
            <TableRow key={todo._id}>
              <TableCell>{todo.name}</TableCell>
              <TableCell align="right">
                <Button
                  variant="contained"
                  color="error"
                  disabled={!(user && user.role === "admin")} // Disable for non-admins
                  onClick={() => handleTodoDelete(todo._id)}
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
