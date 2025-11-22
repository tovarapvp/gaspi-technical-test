import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, Container, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';
import logo from '../assets/logo.png';
import profile from '../assets/profile.jpg';

const WelcomeScreen = () => {
    const navigate = useNavigate();
    const [welcomeData, setWelcomeData] = useState({ candidateName: '', version: '' });

    useEffect(() => {
        const fetchWelcomeData = async () => {
            try {
                const response = await api.get('/welcome');
                setWelcomeData(response.data);
            } catch (error) {
                console.error('Error fetching welcome data:', error);
            }
        };

        fetchWelcomeData();
    }, []);

    return (
        <Box
            sx={{
                height: '100vh',
                width: '100vw',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                bgcolor: '#f5f5f5',
            }}
        >
            {/* Header */}
            <Box sx={{ p: 2, bgcolor: 'white', boxShadow: 1, display: 'flex', alignItems: 'center' }}>
                <img src={logo} alt="Gapsi Logo" style={{ height: 40, marginRight: 10 }} />
                <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
                    e-Commerce Gapsi
                </Typography>
            </Box>

            {/* Content */}
            <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', p: 2 }}>
                <Paper
                    elevation={3}
                    sx={{
                        p: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textAlign: 'center',
                        borderRadius: 2,
                        maxWidth: 400,
                        width: '100%',
                    }}
                >
                    <Box
                        sx={{
                            width: 150,
                            height: 150,
                            mb: 3,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: '50%',
                            overflow: 'hidden',
                        }}
                    >
                        <img src={profile} alt="Candidate" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </Box>
                    <Typography variant="h5" component="h1" gutterBottom fontWeight="bold">
                        {welcomeData.candidateName || 'Cargando...'}
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        onClick={() => navigate('/dashboard')}
                        sx={{ mt: 2, px: 4, borderRadius: 5 }}
                    >
                        Continuar
                    </Button>
                </Paper>
            </Box>

            {/* Footer */}
            <Box sx={{ p: 2, bgcolor: '#333', color: 'white', textAlign: 'right' }}>
                <Typography variant="body2">
                    Versión {welcomeData.version || '...'}
                </Typography>
            </Box>
        </Box>
    );
};

export default WelcomeScreen;
