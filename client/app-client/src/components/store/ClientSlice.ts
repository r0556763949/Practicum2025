// clientSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface Client {
    id: number;
    name: string;
    email: string;
    address?: string;
    phone?: string;
    role?: string;
}

interface ClientState {
    clients: Client[];
    currentClient?: Client;
    loading: boolean;
    error: string | null;
}

const initialState: ClientState = {
    clients: [],
    currentClient: undefined,
    loading: false,
    error: null,
};

// Get all clients
export const fetchAllClients = createAsyncThunk<Client[]>(
    'client/fetchAllClients',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get<Client[]>('https://localhost:7156/api/Client');
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch clients');
        }
    }
);

// Get single client
export const fetchClientById = createAsyncThunk<Client, number>(
    'client/fetchClientById',
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.get<Client>(`https://localhost:7156/api/Client/${id}`);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch client');
        }
    }
);

// עדכון פרטים כלליים
export const updateClientDetails = createAsyncThunk<Client, { id: number; data: Partial<Client> }>(
    'client/updateClientDetails',
    async ({ id, data }, { rejectWithValue }) => {
        try {
            const response = await axios.put<Client>(
                `https://localhost:7156/api/Client/${id}`,
                data,
                { headers: { 'Content-Type': 'application/json' } }
            );
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to update client details');
        }
    }
);

// עדכון סיסמה בלבד
export const updateClientPassword = createAsyncThunk<void, { id: number; newPassword: string }>(
    'client/updateClientPassword',
    async ({ id, newPassword }, { rejectWithValue }) => {
        try {
            await axios.put(
                `https://localhost:7156/api/Client/${id}/password`,
                JSON.stringify(newPassword),
                { headers: { 'Content-Type': 'application/json' } }
            );
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to update password');
        }
    }
);

// Delete client
export const deleteClient = createAsyncThunk<number, number>(
    'client/deleteClient',
    async (id, { rejectWithValue }) => {
        try {
            await axios.delete(`https://localhost:7156/api/Client/${id}`);
            return id;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to delete client');
        }
    }
);

// Create client
export const createClient = createAsyncThunk<Client, Client>(
    'client/createClient',
    async (clientData, { rejectWithValue }) => {
        try {
            const response = await axios.post<Client>(
                'https://localhost:7156/api/Client',
                clientData,
                { headers: { 'Content-Type': 'application/json' } }
            );
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to create client');
        }
    }
);

const clientSlice = createSlice({
    name: 'client',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllClients.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllClients.fulfilled, (state, action: PayloadAction<Client[]>) => {
                state.clients = action.payload;
                state.loading = false;
            })
            .addCase(fetchAllClients.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(fetchClientById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchClientById.fulfilled, (state, action: PayloadAction<Client>) => {
                state.currentClient = action.payload;
                state.loading = false;
            })
            .addCase(fetchClientById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })


            .addCase(deleteClient.fulfilled, (state, action: PayloadAction<number>) => {
                state.clients = state.clients.filter(c => c.id !== action.payload);
                if (state.currentClient?.id === action.payload) {
                    state.currentClient = undefined;
                }
            })
            .addCase(createClient.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createClient.fulfilled, (state, action: PayloadAction<Client>) => {
                state.clients.push(action.payload);
                state.loading = false;
            })
            .addCase(createClient.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(updateClientDetails.fulfilled, (state, action: PayloadAction<Client>) => {
                const index = state.clients.findIndex(c => c.id === action.payload.id);
                if (index !== -1) {
                    state.clients[index] = action.payload;
                }
                if (state.currentClient?.id === action.payload.id) {
                    state.currentClient = action.payload;
                }
            })
            .addCase(updateClientPassword.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateClientPassword.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(updateClientPassword.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default clientSlice.reducer;
