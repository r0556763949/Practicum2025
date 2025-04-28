import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axiosInstance from "./axiosInstance"

// הגדרת סוגי הנתונים
interface ReMark {
  id: number;
  content: string;
  createAt: string;
  clientId: number | null;
  programFileId: number;
}

interface ReMarkState {
  remarks: ReMark[];
  loading: boolean;
  error: string | null;
}

const initialState: ReMarkState = {
  remarks: [],
  loading: false,
  error: null,
};

// Fetch remarks by fileId
export const fetchRemarksByFileId = createAsyncThunk<ReMark[], { fileId: number }>(
  'remarks/fetchRemarksByFileId',
  async ({ fileId }, { rejectWithValue }) => {
    try {
      const response = await axios.get<ReMark[]>(`https://localhost:7156/api/remark/file/${fileId}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch remarks.');
    }
  }
);
//creator
export const fetchFileOwner = createAsyncThunk<number, number>(
  'remarks/fetchFileOwner',
  async (fileId, { rejectWithValue }) => {
    try {
      const response = await axios.get<{ ownerId: number }>(
        `https://localhost:7156/api/clients/{clientId}/projects/{projectId}/files/${fileId}/owner`
      );
      return response.data.ownerId;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch file owner.');
    }
  }
);
// Add remark
export const addRemark = createAsyncThunk<ReMark, { fileId: number; content: string; clientId: number }>(
    'remarks/addRemark',
    async ({ fileId, content, clientId }, { rejectWithValue }) => {
      try {
        const response = await axios.post<ReMark>(
          `https://localhost:7156/api/remark/file/${fileId}`,
          { Content: content, FileId: fileId, ClientId: clientId }, // הוספת FileId ו-ClientId
          { headers: { 'Content-Type': 'application/json' } }
        );
        return response.data;
      } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || 'Failed to add remark.');
      }
    }
  );
  

// Update remark
export const updateRemark = createAsyncThunk<ReMark, { id: number; content: string }>(
  'remarks/updateRemark',
  async ({ id, content }, { rejectWithValue }) => {
    try {
      const response = await axios.put<ReMark>(
        `https://localhost:7156/api/remark/${id}`,
         content ,
        { headers: { 'Content-Type': 'application/json' } }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update remark.');
    }
  }
);

//delete
export const deleteRemark = createAsyncThunk<number, { id: number }>(
  'remarks/deleteRemark',
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`https://localhost:7156/api/remark/${id}`);
      if (response.status === 200) {
        return id; // מחזיר את המזהה של ההערה שנמחקה
      }
      // אם הסטטוס אינו 200, נזרוק שגיאה
      return rejectWithValue('Failed to delete remark.'); 
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete remark.');
    }
  }
);

// Slice
const remarksSlice = createSlice({
  name: 'remarks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch remarks
      .addCase(fetchRemarksByFileId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRemarksByFileId.fulfilled, (state, action: PayloadAction<ReMark[]>) => {
        state.remarks = action.payload;
        state.loading = false;
      })
      .addCase(fetchRemarksByFileId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Add remark
      .addCase(addRemark.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addRemark.fulfilled, (state, action: PayloadAction<ReMark>) => {
        state.remarks.push(action.payload);
        state.loading = false;
      })
      .addCase(addRemark.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Update remark
      .addCase(updateRemark.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateRemark.fulfilled, (state, action: PayloadAction<ReMark>) => {
        const index = state.remarks.findIndex(remark => remark.id === action.payload.id);
        if (index !== -1) {
          state.remarks[index] = action.payload;
        }
        state.loading = false;
      })
      .addCase(updateRemark.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Delete remark
      .addCase(deleteRemark.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteRemark.fulfilled, (state, action: PayloadAction<number>) => {
        state.remarks = state.remarks.filter(remark => remark.id !== action.payload);
        state.loading = false;
      })
      .addCase(deleteRemark.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default remarksSlice.reducer;
