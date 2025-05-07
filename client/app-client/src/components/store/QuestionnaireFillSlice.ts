import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axiosInstance from './axiosInstance';

// סוג הנתונים של QuestionnaireFill
export interface QuestionnaireFill {
  id: number;
  questionnaireId: number;
  userId: number;
  answers: any; // תעדכן בהתאם לסוג התשובות שלך
  createdAt: string;
  updatedAt: string;
}

interface QuestionnaireFillState {
  fills: QuestionnaireFill[];
  loading: boolean;
  error: string | null;
}

const initialState: QuestionnaireFillState = {
  fills: [],
  loading: false,
  error: null,
};

// Fetch all questionnaire fills
export const fetchQuestionnaireFills = createAsyncThunk<QuestionnaireFill[]>(
  'questionnaireFills/fetchQuestionnaireFills',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get<QuestionnaireFill[]>('/questionnairefill');
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch questionnaire fills.');
    }
  }
);

// Fetch single questionnaire fill by ID
export const fetchQuestionnaireFillById = createAsyncThunk<QuestionnaireFill, number>(
  'questionnaireFills/fetchQuestionnaireFillById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get<QuestionnaireFill>(`/questionnairefill/${id}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch questionnaire fill.');
    }
  }
);

// Add questionnaire fill
export const addQuestionnaireFill = createAsyncThunk<QuestionnaireFill, Omit<QuestionnaireFill, 'id'>>(
  'questionnaireFills/addQuestionnaireFill',
  async (fillData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post<QuestionnaireFill>('/questionnairefill', fillData, {
        headers: { 'Content-Type': 'application/json' },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to add questionnaire fill.');
    }
  }
);

// Update questionnaire fill
export const updateQuestionnaireFill = createAsyncThunk<QuestionnaireFill, { id: number; fillData: Partial<QuestionnaireFill> }>(
  'questionnaireFills/updateQuestionnaireFill',
  async ({ id, fillData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put<QuestionnaireFill>(`/questionnairefill/${id}`, fillData, {
        headers: { 'Content-Type': 'application/json' },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update questionnaire fill.');
    }
  }
);

// Delete questionnaire fill
export const deleteQuestionnaireFill = createAsyncThunk<number, number>(
  'questionnaireFills/deleteQuestionnaireFill',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/questionnairefill/${id}`);
      if (response.status === 204) {
        return id;
      }
      return rejectWithValue('Failed to delete questionnaire fill.');
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete questionnaire fill.');
    }
  }
);

// Slice
const questionnaireFillsSlice = createSlice({
  name: 'questionnaireFills',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all
      .addCase(fetchQuestionnaireFills.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchQuestionnaireFills.fulfilled, (state, action: PayloadAction<QuestionnaireFill[]>) => {
        state.fills = action.payload;
        state.loading = false;
      })
      .addCase(fetchQuestionnaireFills.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Fetch by ID
      .addCase(fetchQuestionnaireFillById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchQuestionnaireFillById.fulfilled, (state, action: PayloadAction<QuestionnaireFill>) => {
        const index = state.fills.findIndex(f => f.id === action.payload.id);
        if (index !== -1) {
          state.fills[index] = action.payload;
        } else {
          state.fills.push(action.payload);
        }
        state.loading = false;
      })
      .addCase(fetchQuestionnaireFillById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Add
      .addCase(addQuestionnaireFill.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addQuestionnaireFill.fulfilled, (state, action: PayloadAction<QuestionnaireFill>) => {
        state.fills.push(action.payload);
        state.loading = false;
      })
      .addCase(addQuestionnaireFill.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Update
      .addCase(updateQuestionnaireFill.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateQuestionnaireFill.fulfilled, (state, action: PayloadAction<QuestionnaireFill>) => {
        const index = state.fills.findIndex(f => f.id === action.payload.id);
        if (index !== -1) {
          state.fills[index] = action.payload;
        }
        state.loading = false;
      })
      .addCase(updateQuestionnaireFill.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Delete
      .addCase(deleteQuestionnaireFill.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteQuestionnaireFill.fulfilled, (state, action: PayloadAction<number>) => {
        state.fills = state.fills.filter(f => f.id !== action.payload);
        state.loading = false;
      })
      .addCase(deleteQuestionnaireFill.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default questionnaireFillsSlice.reducer;