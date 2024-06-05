import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { useCookies } from "react-cookie";

import Header from "../../components/Header";
import {
  Typography,
  Button,
  Grid,
  Container,
  Card,
  CardContent,
  TextField,
} from "@mui/material";
import { addTodo } from "../../utils/api_todos";

export default function TodosAddNew() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [name, setName] = useState("");
  const [cookies] = useCookies(["currentUser"]);
  const { currentUser = {} } = cookies;
  const { role } = currentUser;

  // Setup mutation for adding new todo
  const addNewMutation = useMutation({
    mutationFn: addTodo,
    onSuccess: () => {
      enqueueSnackbar("Todo is added", {
        variant: "success",
      });
      navigate("/todos");
    },
    onError: (error) => {
      enqueueSnackbar(error.response.data.message, {
        variant: "error",
      });
    },
  });

  useEffect(() => {
    // Redirect to login page if user is not logged in
    if (!currentUser.token) {
      navigate("/");
    }
  }, [currentUser, navigate]);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (name.trim() === "") {
      enqueueSnackbar("Please enter a name for the todo", {
        variant: "warning",
      });
      return;
    }
    addNewMutation.mutate({
      name: name.trim(),
    });
  };

  return (
    <Container>
      <Header />
      {role === "admin" ? ( // Render page content only for admin users
        <Card>
          <CardContent>
            <Typography
              variant="h4"
              sx={{
                margin: "20px 0",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Add New Todo
            </Typography>
            <form onSubmit={handleFormSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    label="Name"
                    variant="outlined"
                    fullWidth
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button type="submit" variant="contained" fullWidth>
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      ) : (
        <Typography align="center" variant="h6">
          Only admin users have access to this page.
        </Typography>
      )}
    </Container>
  );
}
