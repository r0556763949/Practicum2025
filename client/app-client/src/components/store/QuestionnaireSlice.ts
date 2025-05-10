import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axiosInstance from './axiosInstance';

// הגדרת סוגי הנתונים
export interface Questionnaire {
  id: number;
  name: string;
  sheetName: string;
  prompt: string;
  googleSheetId: string;
  googleFormUrl: string;
  isActive: boolean;
  createdAt: string;
}
export type QuestionnaireCreateDto = Omit<Questionnaire, 'id' | 'createdAt'>;

interface QuestionnaireState {
  questionnaires: Questionnaire[];
  loading: boolean;
  error: string | null;
}

const initialState: QuestionnaireState = {
  questionnaires: [],
  loading: false,
  error: null,
};

// Fetch all questionnaires
export const fetchQuestionnaires = createAsyncThunk<Questionnaire[]>(
  'questionnaires/fetchQuestionnaires',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get<Questionnaire[]>('/questionnaire');
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch questionnaires.');
    }
  }
);

// Fetch single questionnaire by ID
export const fetchQuestionnaireById = createAsyncThunk<Questionnaire, number>(
  'questionnaires/fetchQuestionnaireById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get<Questionnaire>(`/questionnaire/${id}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch questionnaire.');
    }
  }
);

// Add questionnaire
export const addQuestionnaire = createAsyncThunk<Questionnaire, QuestionnaireCreateDto>(
  'questionnaires/addQuestionnaire',
  async (questionnaireData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post<{ id: number }>('/questionnaire', questionnaireData, {
        headers: { 'Content-Type': 'application/json' },
      });
      const id = response.data.id;
      // אחרי הוספה, נביא את כל הנתונים ע"י קריאה נוספת
      const fullResponse = await axiosInstance.get<Questionnaire>(`/questionnaire/${id}`);
      return fullResponse.data;
    } catch (error: any) {
      const message =
        error.response?.data?.message ||
        (typeof error.response?.data === 'string' ? error.response.data : 'Failed to add questionnaire.');
      return rejectWithValue(message);
    }
  }
);

// Update questionnaire
export const updateQuestionnaire = createAsyncThunk<number, { id: number; questionnaireData: QuestionnaireCreateDto }>(
  'questionnaires/updateQuestionnaire',
  async ({ id, questionnaireData }, { rejectWithValue }) => {
    try {
      await axiosInstance.put(`/questionnaire/${id}`, questionnaireData, {
        headers: { 'Content-Type': 'application/json' },
      });
      return id; // נחזיר רק את ה-ID
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update questionnaire.');
    }
  }
);

// Delete questionnaire
export const deleteQuestionnaire = createAsyncThunk<number, number>(
  'questionnaires/deleteQuestionnaire',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/questionnaire/${id}`);
      if (response.status === 204) {
        return id;
      }
      return rejectWithValue('Failed to delete questionnaire.');
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete questionnaire.');
    }
  }
);

// Slice
const questionnairesSlice = createSlice({
  name: 'questionnaires',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all
      .addCase(fetchQuestionnaires.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchQuestionnaires.fulfilled, (state, action: PayloadAction<Questionnaire[]>) => {
        state.questionnaires = action.payload;
        state.loading = false;
      })
      .addCase(fetchQuestionnaires.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Fetch by ID (אפשר לשמור את זה בסטייט אחר אם תרצה)
      .addCase(fetchQuestionnaireById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchQuestionnaireById.fulfilled, (state, action: PayloadAction<Questionnaire>) => {
        // אפשר להחליף את הסטייט אם תרצה, כאן אני בוחר לעדכן את הרשימה אם הפריט כבר קיים
        const index = state.questionnaires.findIndex(q => q.id === action.payload.id);
        if (index !== -1) {
          state.questionnaires[index] = action.payload;
        } else {
          state.questionnaires.push(action.payload);
        }
        state.loading = false;
      })
      .addCase(fetchQuestionnaireById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Add
      .addCase(addQuestionnaire.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addQuestionnaire.fulfilled, (state, action: PayloadAction<Questionnaire>) => {
        state.questionnaires.push(action.payload);
        state.loading = false;
      })
      .addCase(addQuestionnaire.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

// Update
.addCase(updateQuestionnaire.pending, (state) => {
  state.loading = true;
  state.error = null;
})
.addCase(updateQuestionnaire.fulfilled, (state, action: PayloadAction<number>) => {
  const updatedId = action.payload;
  state.questionnaires = state.questionnaires.filter(q => q.id !== updatedId);
  state.loading = false;
})
.addCase(updateQuestionnaire.rejected, (state, action) => {
  state.loading = false;
  state.error = action.payload as string;
})

      // Delete
      .addCase(deleteQuestionnaire.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteQuestionnaire.fulfilled, (state, action: PayloadAction<number>) => {
        state.questionnaires = state.questionnaires.filter(q => q.id !== action.payload);
        state.loading = false;
      })
      .addCase(deleteQuestionnaire.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default questionnairesSlice.reducer;