import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { getTodos } from "../../utils/api_todos";
import TodoTable from "../../components/TodoTable";
import Header from "../../components/Header";
import { useCookies } from "react-cookie";

import { Box, Typography, Container, Button } from "@mui/material";

export default function Todos() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(6);
  const [cookies] = useCookies(["currentUser"]);
  const { currentUser = {} } = cookies;
  const { role } = currentUser;

  const { data: rows = [] } = useQuery({
    queryKey: ["todos", perPage, page],
    queryFn: () => getTodos(perPage, page),
  });

  useEffect(() => {
    // Redirect to login page if user is not logged in
    if (!currentUser.token) {
      navigate("/");
    }
  }, [currentUser, navigate]);

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
              Task to be completed for the staff
            </Typography>
            <Box sx={{ marginLeft: "auto" }}>
              {role === "admin" ? (
                <Button
                  variant="contained"
                  color="success"
                  size="small"
                  onClick={() => {
                    navigate("/add-todo");
                  }}
                >
                  Add New
                </Button>
              ) : null}
            </Box>
          </Container>
        </Box>

        {rows.length > 0 ? (
          <TodoTable todos={rows} />
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
