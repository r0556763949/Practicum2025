import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

// הגדרת סוגי הנתונים
interface File {
  id: number;
  name: string;
  description: string;
  path: string; // שדה חדש עבור path
}

interface FileState {
  files: File[];
  loading: boolean;
  error: string | null;
}

const initialState: FileState = {
  files: [],
  loading: false,
  error: null,
};

// Fetch files
export const fetchFiles = createAsyncThunk<File[], { clientId: number; projectId: number }>(
  'files/fetchFiles',
  async ({ clientId, projectId }, { rejectWithValue }) => {
    try {
      const response = await axios.get<File[]>(
        `https://localhost:7156/api/clients/${clientId}/projects/${projectId}/files`
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch files.');
    }
  }
);

// Add file
export const addFile = createAsyncThunk<File, { fileData: Omit<File, 'id'>; clientId: number; projectId: number }>(
  'files/addFile',
  async ({ fileData, clientId, projectId }, { rejectWithValue }) => {
    try {
      const response = await axios.post<File>(
        `https://localhost:7156/api/clients/${clientId}/projects/${projectId}/files/confirm-upload`,
        {
          FileName: fileData.name,
          Description: fileData.description,
          FilePath: fileData.path // שים לב לשמות השדות
        },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to add file.');
    }
  }
);

export interface UploadUrlResponse {
    uploadUrl: string;
    filePath: string;
}

export const getUploadUrl = createAsyncThunk<UploadUrlResponse, { clientId: number; projectId: number; name: string }>(
    'files/getUploadUrl',
    async ({ clientId, projectId, name }, { rejectWithValue }) => {
        try {
            const response = await axios.post<UploadUrlResponse>(
                `https://localhost:7156/api/clients/${clientId}/projects/${projectId}/files/upload-url`,
                JSON.stringify(name), // שליחה כ-string ישיר
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'An error occurred while fetching the upload URL.');
        }
    }
)

// Confirm upload
export const confirmUpload = createAsyncThunk<File, { clientId: number; projectId: number; request: { fileName: string; description: string; filePath: string } }>(
    'files/confirmUpload',
    async ({ clientId, projectId, request }, { rejectWithValue }) => {
      try {
        const response = await axios.post<File>(
          `https://localhost:7156/api/clients/${clientId}/projects/${projectId}/files/confirm-upload`,
          {
            FileName: request.fileName,
            Description: request.description,
            FilePath: request.filePath
          },
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );
        return response.data;
      } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || 'Failed to confirm upload.');
      }
    }
);

// Delete file
export const deleteFile = createAsyncThunk<number, { clientId: number; projectId: number; id: number }>(
  'files/deleteFile',
  async ({ clientId, projectId, id }, { rejectWithValue }) => {
    try {
      await axios.delete(`https://localhost:7156/api/clients/${clientId}/projects/${projectId}/files/${id}`);
      return id; // מחזיר את המזהה של הקובץ שנמחק
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete file.');
    }
  }
);

// Download file
export const downloadFile = createAsyncThunk<any, { clientId: number; projectId: number; id: number }>(
    'files/downloadFile',
    async ({ clientId, projectId, id }, { rejectWithValue }) => {
      try {
        const response = await axios.get(`https://localhost:7156/api/clients/${clientId}/projects/${projectId}/files/${id}/download`);
        const downloadUrl = response.data.downloadUrl; // קבלת ה-URL להורדה
        window.location.href = downloadUrl;  // מבצע את ההורדה
        return downloadUrl;
      } catch (error: any) {
        console.log(error);
        return rejectWithValue(error.response?.data?.message || 'Failed to download file.');
      }
    }
  );

// View file
export const viewFile = createAsyncThunk<any, { clientId: number; projectId: number; id: number }>(
    'files/viewFile',
    async ({ clientId, projectId, id }, { rejectWithValue }) => {
      try {
        const response = await axios.get(`https://localhost:7156/api/clients/${clientId}/projects/${projectId}/files/${id}/view`);
        const viewUrl = response.data.viewUrl; // קבלת ה-URL לצפייה
        window.open(viewUrl, "_blank"); // פותח את הקובץ בחלון חדש
        return viewUrl;
      } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || 'Failed to view file.');
      }
    }
  );

// Slice
const filesSlice = createSlice({
  name: 'files',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(fetchFiles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFiles.fulfilled, (state, action: PayloadAction<File[]>) => {
        state.files = action.payload;
        state.loading = false;
      })
      .addCase(fetchFiles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(getUploadUrl.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUploadUrl.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(getUploadUrl.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(confirmUpload.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(confirmUpload.fulfilled, (state, action: PayloadAction<File>) => {
        state.files.push(action.payload);
        state.loading = false;
      })
      .addCase(confirmUpload.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(addFile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addFile.fulfilled, (state, action: PayloadAction<File>) => {
        state.files.push(action.payload);
        state.loading = false;
      })
      .addCase(addFile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default filesSlice.reducer;

