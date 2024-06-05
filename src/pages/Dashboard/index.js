import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import { Container, Button, Box, Grid } from "@mui/material";
import React from 'react';

export default function DashBoard() {
    const navigate = useNavigate();

    return (
        <>
            <style>
                {`
                    .hover-opacity::before {
                        content: '';
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background-color: rgba(0, 0, 0, 0.5); /* initial overlay color */
                        opacity: 0;
                        transition: opacity 0.3s ease-in-out;
                    }

                    .hover-opacity:hover::before {
                        opacity: 1;
                    }

                    .background-container {
                        position: relative;
                        height: 100%;
                    }
                `}
            </style>
            <Container>
                <Header />
                <Grid 
                    container 
                    style={{ height: 'calc(100vh - 64px)' }}
                    spacing={2}
                >
                    {/* Product */}
                    <Grid
                        item
                        xs={12}
                        md={6}
                        className="background-container hover-opacity"
                        style={{
                            backgroundImage: 'url(/images/product.jpeg)',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                        }}
                    >
                        <Box
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            height="100%"
                            position="relative"
                            zIndex={1}  // Ensures the button is above the overlay
                        >
                            <Button
                                variant="contained"
                                color="primary"
                                style={{ width: '200px', height: '100px', fontSize: '20px' }}
                                onClick={() => navigate('/product')}
                            >
                                Product
                            </Button>
                        </Box>
                    </Grid>
                    {/* Supplier */}
                    <Grid
                        item
                        xs={12}
                        md={6}
                        className="background-container hover-opacity"
                        style={{
                            backgroundImage: 'url(/images/supplier.jpeg)',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                        }}
                    >
                        <Box
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            height="100%"
                            position="relative"
                            zIndex={1}  // Ensures the button is above the overlay
                        >
                            <Button
                                variant="contained"
                                color="secondary"
                                style={{ width: '200px', height: '100px', fontSize: '20px' }}
                                onClick={() => navigate('/supplier')}
                            >
                                Supplier
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}
