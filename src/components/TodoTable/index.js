import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { deleteTodo } from "../../utils/api_todos";
import { useSnackbar } from "notistack";
import { useCookies } from "react-cookie";

export default function TodoTable({ todos }) {
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  const [cookies] = useCookies(["currentUser"]);
  const { currentUser = {} } = cookies;
  const { role } = currentUser;

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
    const confirm = window.confirm(
      "Are you sure you want to delete this todo?"
    );
    if (confirm) {
      deleteTodoMutation.mutate(todoId);
    }
  };

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
                {role === "admin" ? (
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleTodoDelete(todo._id)}
                  >
                    Delete
                  </Button>
                ) : null}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
