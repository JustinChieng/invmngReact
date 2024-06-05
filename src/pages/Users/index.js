import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { getUsers } from "../../utils/api_users";
import UserTable from "../../components/UserTable";
import Header from "../../components/Header";
import { useCookies } from "react-cookie";

import { Box, Typography, Container, Button } from "@mui/material";

export default function Users() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(6);
  const [cookies] = useCookies(["currentUser"]);
  const { currentUser = {} } = cookies;
  const { role } = currentUser;

  useEffect(() => {
    // Redirect if user is not an admin
    if (role !== "admin") {
      navigate("/"); // Redirect to login
    }
  }, [role, navigate]);

  const { data: rows = [] } = useQuery({
    queryKey: ["users", perPage, page],
    queryFn: () => getUsers(perPage, page),
  });

  return (
    <>
      <Container>
        <Header />
        <Box style={{ marginBottom: "20px" }}>
          <Typography variant="h5" style={{ margin: 0 }}>
            Users
          </Typography>
        </Box>

        {rows.length > 0 ? (
          <UserTable users={rows} />
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
