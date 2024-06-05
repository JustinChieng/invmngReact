import React, { useEffect, useState } from "react";
import { Typography, Divider, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  let pageTitle = "Inventory Manager";

  return (
    <>
      <Typography
        variant="h6"
        component="div"
        sx={{
          textAlign: "center",
          marginTop: "20px",
          marginBottom: "20px",
          fontWeight: "bold",
          fontSize: "40px",
        }}
      >
        {pageTitle}
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "20px",
        }}
      >
        <Button onClick={() => navigate("/dashboard")}>Home</Button>
        {user && user.role === "admin" && (
          <>
            <Button onClick={() => navigate("/users")}>Users</Button>
            <Button onClick={() => navigate("/todos")}>Todos</Button>
          </>
        )}
        {user && user.role === "user" && <Button onClick={() => navigate("/todos")}>Todos</Button>}
        <Button onClick={handleLogout} sx={{ color: "red" }}>
          Logout
        </Button>
      </Box>
      <Divider />
    </>
  );
}