import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/api';

// Async Thunks
export const fetchProviders = createAsyncThunk(
    'providers/fetchProviders',
    async ({ page, size } = { page: 0, size: 100 }, { rejectWithValue }) => {
        try {
            const response = await api.get(`/providers?page=${page}&size=${size}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Error fetching providers');
        }
    }
);

export const addProvider = createAsyncThunk(
    'providers/addProvider',
    async (providerData, { rejectWithValue }) => {
        try {
            const response = await api.post('/providers', providerData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Error adding provider');
        }
    }
);

export const deleteProvider = createAsyncThunk(
    'providers/deleteProvider',
    async (id, { rejectWithValue }) => {
        try {
            await api.delete(`/providers/${id}`);
            return id;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Error deleting provider');
        }
    }
);

const providerSlice = createSlice({
    name: 'providers',
    initialState: {
        list: [],
        totalElements: 0,
        loading: false,
        error: null,
        successMessage: null,
    },
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        clearSuccess: (state) => {
            state.successMessage = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch Providers
            .addCase(fetchProviders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProviders.fulfilled, (state, action) => {
                state.loading = false;
                state.list = Array.isArray(action.payload?.content) ? action.payload.content : [];
                state.totalElements = action.payload?.totalElements || 0;
            })
            .addCase(fetchProviders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Add Provider
            .addCase(addProvider.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addProvider.fulfilled, (state, action) => {
                state.loading = false;
                state.list.push(action.payload);
                state.successMessage = 'Provider added successfully';
            })
            .addCase(addProvider.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Delete Provider
            .addCase(deleteProvider.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteProvider.fulfilled, (state, action) => {
                state.loading = false;
                state.list = state.list.filter((provider) => provider.id !== action.payload);
                state.successMessage = 'Provider deleted successfully';
            })
            .addCase(deleteProvider.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { clearError, clearSuccess } = providerSlice.actions;
export default providerSlice.reducer;
