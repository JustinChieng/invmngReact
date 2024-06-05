import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
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
import { getSupplier, updateSupplier } from "../../utils/api_suppliers";

export default function SuppliersEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [category, setCategory] = useState("");

  // get data from supplier api: /suppliers/:id
  const {
    data: supplier,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["supplier", id],
    queryFn: () => getSupplier(id),
  });

  // when data is fetched from API, set the states for all the fields with its current value
  useEffect(() => {
    // if supplier is not undefined
    if (supplier) {
      setName(supplier.name);
      setEmail(supplier.email);
      setPhone(supplier.phone);
      setCategory(supplier.category);
    }
  }, [supplier]);

  const updateSupplierMutation = useMutation({
    mutationFn: updateSupplier,
    onSuccess: () => {
      enqueueSnackbar("Supplier is updated", {
        variant: "success",
      });

      navigate("/supplier");
    },
    onError: (error) => {
      enqueueSnackbar(error.response.data.message, {
        variant: "error",
      });
    },
  });

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // trigger the mutation to call the API
    updateSupplierMutation.mutate({
      id: id,
      name: name,
      email: email,
      phone: phone,
      category: category,
    });
  };

  // if API data is still loading
  if (isLoading) {
    return <Container>Loading...</Container>;
  }

  // if there is an error in API call
  if (error) {
    return <Container>{error.response.data.message}</Container>;
  }

  return (
    <Container>
      <Header />
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
            Edit Product
          </Typography>
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
                label="Phone"
                variant="outlined"
                fullWidth
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Category"
                variant="outlined"
                fullWidth
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <Button variant="contained" fullWidth onClick={handleFormSubmit}>
                Update
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
}
