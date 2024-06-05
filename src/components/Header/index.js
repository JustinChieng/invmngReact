import React, { useEffect } from "react";
import { Typography, Divider, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export default function Header() {
  const navigate = useNavigate();
  const [cookies, setCookies, removeCookie] = useCookies(["currentUser"]);
  const { currentUser = {} } = cookies;
  const { role, token } = currentUser;

  const handleLogout = () => {
    removeCookie("currentUser");
    navigate("/");
  };

  let pageTitle = "Inventory Manager";

  return (
    <>
      <Box
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.4)", // Set slightly opaque white background
          padding: "20px",
          textAlign: "center",
        }}
      >
        <Typography
          variant="h6"
          component="div"
          sx={{
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
            marginTop: "20px",
          }}
        >
          <Button
            onClick={() => navigate("/dashboard")}
            sx={{
              "&:hover": {
                backgroundColor: "rgba(0, 0, 255, 0.2)", // Blue color with slight opacity on hover
              },
            }}
          >
            Home
          </Button>
          {role && role === "admin" ? (
            <Button
              onClick={() => navigate("/users")}
              sx={{
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 255, 0.2)", // Blue color with slight opacity on hover
                },
              }}
            >
              Users
            </Button>
          ) : null}
          <Button
            onClick={() => navigate("/todos")}
            sx={{
              "&:hover": {
                backgroundColor: "rgba(0, 0, 255, 0.2)", // Blue color with slight opacity on hover
              },
            }}
          >
            Todos
          </Button>
          <Button
            onClick={handleLogout}
            sx={{
              color: "red",
              "&:hover": {
                backgroundColor: "rgba(255, 0, 0, 0.2)", // Red color with slight opacity on hover
              },
            }}
          >
            Logout
          </Button>
        </Box>
      </Box>
      <Divider />
    </>
  );
}
