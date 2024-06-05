import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { getSuppliers } from "../../utils/api_suppliers";
import { getSupplierCategories } from "../../utils/api_categories";


import Header from "../../components/Header";
import SupplierTable from "../../components/SupplierTable";  // Update the import

import {
  Box,
  Typography,
  Container,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

export default function Suppliers() {
  const navigate = useNavigate();
  const [category, setCategory] = useState("all");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(6);
  const [user, setUser] = useState(null);

  const { data: rows = [] } = useQuery({
    queryKey: ["suppliers", category, perPage, page],  
    queryFn: () => getSuppliers(category, perPage, page),  
  });
  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: getSupplierCategories,
  });

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  return (
    <>
      <Container>
        <Header />
        <Box style={{ marginBottom: "20px" }}>
          <Container
            style={{
              display: "flex",
              alignItems: "center",
              margin: "10px",
              paddingLeft: 0,
              paddingRight: 0,
              width: "100%",
            }}
          >
            <Typography variant="h5" style={{ margin: 0 }}>
              Suppliers
            </Typography>
            <Box sx={{ marginLeft: "auto" }}>
              <Button
                variant="contained"
                color="success"
                size="small"
                disabled={!(user && user.role === "admin")} 
                onClick={() => {
                  navigate("/add-supplier");
                }}
              >
                Add New
              </Button>
            </Box>
          </Container>

          <Box sx={{ display: "flex", gap: "10px", marginTop: "10px" }}>
            <FormControl sx={{ width: "200px" }}>
              <InputLabel id="category-select-label">All Categories</InputLabel>
              <Select
                labelId="category-select-label"
                id="category-select"
                value={category}
                onChange={(event) => {
                  setCategory(event.target.value);
                  // reset the page to 1
                  setPage(1);
                }}
                label="Categories"
              >
                <MenuItem value="all">All Categories</MenuItem>
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Box>

        {rows.length > 0 ? (
          <SupplierTable suppliers={rows} />  
        ) : (
          <Typography align="center" sx={{ padding: "10px 0" }}>
            End of List.
          </Typography>
        )}

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
            marginTop: "10px",
            padding: "20px 0",
          }}
        >
          <Button
            disabled={page === 1}  // Disable if on the first page
            onClick={() => setPage(page - 1)}
          >
            Back
          </Button>
          <span>Page: {page}</span>
          <Button
            disabled={rows.length === 0}
            onClick={() => setPage(page + 1)}
          >
            Next
          </Button>
        </Box>
      </Container>
    </>
  );
}
