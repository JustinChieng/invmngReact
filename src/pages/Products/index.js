import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { getProducts } from "../../utils/api_product";
import { getCategories } from "../../utils/api_categories";
import { getBoxes } from "../../utils/api_boxes";

import Header from "../../components/Header";
import ProductTable from "../../components/ProductTable"; // Update the import

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

export default function Products() {
  const navigate = useNavigate();
  const [category, setCategory] = useState("all");
  const [box, setBox] = useState("all"); // Added box state
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(6);
  const [user, setUser] = useState(null);

  const { data: rows = [] } = useQuery({
    queryKey: ["products", category, box, perPage, page], // Added box to queryKey
    queryFn: () => getProducts(category, box, perPage, page), // Added box to getProducts
  });
  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
  const { data: boxes = [] } = useQuery({
    queryKey: ["boxes"],
    queryFn: getBoxes,
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
              Products
            </Typography>
            <Box sx={{ marginLeft: "auto" }}>
              <Button
                variant="contained"
                color="success"
                size="small"
                disabled={!(user && user.role === "admin")} 
                onClick={() => {
                  navigate("/add-product");
                }}
              >
                Add New
              </Button>
            </Box>
          </Container>

          <Box sx={{ display: "flex", gap: "10px", marginTop: "10px" }}>
            <FormControl sx={{ width: "200px" }}>
              <InputLabel id="category-select-label">Categories</InputLabel>
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
            <FormControl sx={{ width: "200px" }}>
              <InputLabel id="box-select-label">Boxes</InputLabel>
              <Select
                labelId="box-select-label"
                id="box-select"
                value={box}
                onChange={(event) => {
                  setBox(event.target.value);
                  // reset the page to 1
                  setPage(1);
                }}
                label="Boxes"
              >
                <MenuItem value="all">All Boxes</MenuItem>
                {boxes.map((box) => (
                  <MenuItem key={box} value={box}>
                    {box}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Box>

        {rows.length > 0 ? (
          <>
            <ProductTable products={rows} /> {/* Render the ProductTable component with products */}
            <Typography
              variant="body2"
              style={{ marginLeft: "10px", color: "red" }}
            >
              * Products in red means stock is low and restocking is required
            </Typography>
          </>
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
            disabled={page === 1} // Disable if on the first page
            onClick={() => setPage(page - 1)}
          >
            Back
          </Button>
          <span>Page: {page}</span>
          <Button disabled={rows.length === 0} onClick={() => setPage(page + 1)}>
            Next
          </Button>
        </Box>
      </Container>
    </>
  );
}
