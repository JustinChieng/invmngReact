import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SnackbarProvider } from "notistack";

import DashBoard from "./pages/Dashboard";
import Login from "./pages/UserLogin";
import Signup from "./pages/UserSignUp";
import Products from "./pages/Products";
import Suppliers from "./pages/Supplier";
import ProductsAddNew from "./pages/ProductsAddNew";
import ProductsEdit from "./pages/ProductsEdit";
import SuppliersAddNew from "./pages/SupplierAdd";
import SuppliersEdit from "./pages/SupplierEdit";
import Todos from "./pages/Todos";
import TodosAddNew from "./pages/TodosAdd";
import Users from "./pages/Users";


// Create a client
const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SnackbarProvider
        maxSnack={3}
        autoHideDuration={2000}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} /> {/* Set login page as the root URL */}
            <Route path="/dashboard" element={<DashBoard />} />
            <Route path="signup" element={<Signup />} />
            <Route path="/product" element={<Products />} />
            <Route path="/supplier" element={<Suppliers />} />
            <Route path="/add-product" element={<ProductsAddNew />} />
            <Route path="/products/:id" element={<ProductsEdit />} />
            <Route path="/add-supplier" element={<SuppliersAddNew />} />
            <Route path="/suppliers/:id" element={<SuppliersEdit />} />
            <Route path="/todos" element={<Todos />} />
            <Route path="/add-todo" element={<TodosAddNew />} />
            <Route path="/users" element={<Users />} />
            
            

            
          </Routes>
        </BrowserRouter>
      </SnackbarProvider>
    </QueryClientProvider>
  );
}
