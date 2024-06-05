import { useNavigate } from "react-router-dom";
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
import { deleteProduct } from "../../utils/api_product"; // Ensure you have this function
import { useSnackbar } from "notistack";
import { useCookies } from "react-cookie";

export default function ProductTable({ products }) {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  const [cookies, setCookies, removeCookie] = useCookies(["currentUser"]);
  const { currentUser = {} } = cookies;
  const { role } = currentUser;

  const deleteProductMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      enqueueSnackbar("Product is deleted", {
        variant: "success",
      });
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
    onError: (error) => {
      enqueueSnackbar(error.response.data.message, {
        variant: "error",
      });
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
  });

  const handleProductDelete = (productId) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (confirm) {
      deleteProductMutation.mutate(productId);
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Box</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product._id}>
              <TableCell
                style={{ color: product.quantity < 10 ? "red" : "inherit" }}
              >
                {product.name}
              </TableCell>
              <TableCell
                style={{ color: product.quantity < 10 ? "red" : "inherit" }}
              >
                {product.description}
              </TableCell>
              <TableCell
                style={{ color: product.quantity < 10 ? "red" : "inherit" }}
              >
                {product.quantity}
              </TableCell>
              <TableCell
                style={{ color: product.quantity < 10 ? "red" : "inherit" }}
              >
                {product.category}
              </TableCell>
              <TableCell
                style={{ color: product.quantity < 10 ? "red" : "inherit" }}
              >
                {product.box}
              </TableCell>
              <TableCell>
                {role === "admin" ? (
                  <>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        navigate("/products/" + product._id);
                      }}
                      sx={{ marginRight: 1 }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleProductDelete(product._id)}
                    >
                      Delete
                    </Button>
                  </>
                ) : null}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
