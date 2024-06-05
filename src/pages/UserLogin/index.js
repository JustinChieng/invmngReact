import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { Container, Card, CardContent, Grid, TextField, Button, Typography } from "@mui/material";
import { loginUser } from "../../utils/api_users";

export default function Login() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const addNewMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      enqueueSnackbar("Successfully Login", { variant: "success" });
      // Store user data in localStorage
      localStorage.setItem("user", JSON.stringify(data));
      navigate("/dashboard");
    },
    onError: (error) => {
      alert(error.response.data.message);
    },
  });

  const handleFormSubmit = (event) => {
    event.preventDefault();
    addNewMutation.mutate({
      email: email,
      password: password,
    });
  };

  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        Inventory Manager
      </Typography>
      <Typography variant="h5" align="center" gutterBottom>
        Login page
      </Typography>
      <Card>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Password"
                variant="outlined"
                fullWidth
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" fullWidth onClick={handleFormSubmit}>
                Login
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" align="center">
                Don't have an account? <Link to="/signup">Sign Up here</Link>
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
}
