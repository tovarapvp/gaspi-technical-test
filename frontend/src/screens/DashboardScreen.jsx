import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Box,
    Button,
    Container,
    Typography,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Alert,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material';
import { Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';
import { fetchProviders, addProvider, deleteProvider, clearError, clearSuccess } from '../features/providers/providerSlice';

const DashboardScreen = () => {
    const dispatch = useDispatch();
    const { list: rawList, loading, error, successMessage } = useSelector((state) => state.providers);
    const list = Array.isArray(rawList) ? rawList : [];
    const [open, setOpen] = useState(false);
    const [newProvider, setNewProvider] = useState({ name: '', businessName: '', address: '' });

    const [validationError, setValidationError] = useState(null);

    useEffect(() => {
        dispatch(fetchProviders({ page: 0, size: 100 }));
    }, [dispatch]);

    useEffect(() => {
        if (successMessage) {
            setOpen(false);
            setNewProvider({ name: '', businessName: '', address: '' });
            setValidationError(null);
            setTimeout(() => dispatch(clearSuccess()), 3000);
        }
    }, [successMessage, dispatch]);

    const handleOpen = () => {
        setOpen(true);
        setValidationError(null);
        dispatch(clearError());
    };
    const handleClose = () => {
        setOpen(false);
        setValidationError(null);
        dispatch(clearError());
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProvider({ ...newProvider, [name]: value });
        if (validationError) setValidationError(null);
    };

    const handleSubmit = () => {
        if (!newProvider.name.trim() || !newProvider.businessName.trim() || !newProvider.address.trim()) {
            setValidationError('Todos los campos son obligatorios (Nombre, Razón Social, Dirección).');
            return;
        }
        dispatch(addProvider(newProvider));
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this provider?')) {
            dispatch(deleteProvider(id));
        }
    };

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: '#f5f5f5', display: 'flex', flexDirection: 'column' }}>
            {/* Header */}
            <Box sx={{ p: 2, bgcolor: 'white', boxShadow: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="h5" fontWeight="normal" color="primary" sx={{ ml: 1 }}>
                        Administración de proveedores
                    </Typography>
                </Box>
                <Box>
                    <Button
                        variant="text"
                        startIcon={<Box sx={{ bgcolor: '#007bff', borderRadius: '50%', width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}><AddIcon fontSize="small" /></Box>}
                        onClick={handleOpen}
                        sx={{ color: '#555', textTransform: 'none', mr: 2 }}
                    >
                        Agregar elemento
                    </Button>
                    <Button
                        variant="text"
                        startIcon={<Box sx={{ bgcolor: '#dc3545', borderRadius: '50%', width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}><span style={{ fontSize: '12px', fontWeight: 'bold' }}>P</span></Box>}
                        sx={{ color: '#555', textTransform: 'none' }}
                    >
                        Imprimir elemento
                    </Button>
                </Box>
            </Box>

            {/* Content */}
            <Container sx={{ flexGrow: 1, mt: 3, mb: 3 }}>
                {successMessage && <Alert severity="success" sx={{ mb: 2 }}>{successMessage}</Alert>}
                {error && typeof error === 'string' && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead sx={{ bgcolor: '#f0f0f0' }}>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 'bold', color: '#555' }}>Nombre</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', color: '#555' }}>Razón Social</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', color: '#555' }}>Dirección</TableCell>
                                <TableCell align="center" sx={{ fontWeight: 'bold', color: '#555', width: 100 }}>Acciones</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {list.map((provider) => (
                                <TableRow
                                    key={provider.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 }, '&:hover': { bgcolor: '#f9f9f9' } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {provider.name}
                                    </TableCell>
                                    <TableCell>{provider.businessName}</TableCell>
                                    <TableCell>{provider.address}</TableCell>
                                    <TableCell align="center">
                                        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                                            <IconButton size="small" color="default">
                                                <span style={{ fontSize: '16px' }}>👁️</span>
                                            </IconButton>
                                            <IconButton size="small" color="error" onClick={() => handleDelete(provider.id)}>
                                                <DeleteIcon fontSize="small" />
                                            </IconButton>
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {list.length === 0 && !loading && (
                                <TableRow>
                                    <TableCell colSpan={4} align="center" sx={{ py: 3 }}>
                                        No hay proveedores registrados.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>

            {/* Add Provider Modal */}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Agregar Proveedor</DialogTitle>
                <DialogContent>
                    {error && typeof error === 'string' && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                    {validationError && <Alert severity="warning" sx={{ mb: 2 }}>{validationError}</Alert>}
                    <TextField
                        autoFocus
                        margin="dense"
                        name="name"
                        label="Nombre"
                        fullWidth
                        variant="outlined"
                        value={newProvider.name}
                        onChange={handleInputChange}
                    />
                    <TextField
                        margin="dense"
                        name="businessName"
                        label="Razón Social"
                        fullWidth
                        variant="outlined"
                        value={newProvider.businessName}
                        onChange={handleInputChange}
                    />
                    <TextField
                        margin="dense"
                        name="address"
                        label="Dirección"
                        fullWidth
                        variant="outlined"
                        value={newProvider.address}
                        onChange={handleInputChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancelar</Button>
                    <Button onClick={handleSubmit} variant="contained">Guardar</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default DashboardScreen;
