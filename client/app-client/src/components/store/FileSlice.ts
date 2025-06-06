import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axiosInstance from "./axiosInstance"
import axios from 'axios';

interface File {
  id: number;
  name: string;
  description: string;
  path: string; 
  type:'.pdf'| '.jpg'|'.jpeg'|'.png';
}

interface FileState {
  selectedFileUrl: any;
  files: File[];
  loading: boolean;
  error: string | null;
}

const initialState: FileState = {
  selectedFileUrl: [],
  files: [],
  loading: false,
  error: null,
};

// Fetch files
export const fetchFiles = createAsyncThunk<File[], { clientId: number; projectId: number }>(
  'files/fetchFiles',
  async ({ clientId, projectId }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get<File[]>(
        `clients/${clientId}/projects/${projectId}/files`
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
      const response = await axiosInstance.post<File>(
        `/clients/${clientId}/projects/${projectId}/files/confirm-upload`,
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
            const response = await axiosInstance.post<UploadUrlResponse>(
                `/clients/${clientId}/projects/${projectId}/files/upload-url`,
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
        const response = await axiosInstance.post<File>(
          `/clients/${clientId}/projects/${projectId}/files/confirm-upload`,
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
      await axiosInstance.delete(`/clients/${clientId}/projects/${projectId}/files/${id}`);
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
        const response = await axiosInstance.get(`/clients/${clientId}/projects/${projectId}/files/${id}/download`);
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
        const response = await axiosInstance.get(`/clients/${clientId}/projects/${projectId}/files/${id}/view`);
        const viewUrl = response.data.viewUrl; // קבלת ה-URL לצפייה
        window.open(viewUrl, "_blank"); // פותח את הקובץ בחלון חדש
        return viewUrl;
      } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || 'Failed to view file.');
      }
    }
  );

  export const fetchFileUrl  = createAsyncThunk<any, { clientId: number; projectId: number; id: number }>(
    'files/viewFile',
    async ({ clientId, projectId, id }, { rejectWithValue }) => {
      try {
        const response = await axiosInstance.get(`clients/${clientId}/projects/${projectId}/files/${id}/view`);
        const viewUrl = response.data.viewUrl; // קבלת ה-URL לצפייה
        console.log(viewUrl);
        return viewUrl;
      } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || 'Failed to view file.');
      }
    }
  );

  export const updateFile = createAsyncThunk(
    'files/updateFile',
    async (
      {
        clientId,
        projectId,
        fileId,
        name,
        description,
        replaceContent,
        file // קובץ חדש אם צריך
      }: {
        clientId: number;
        projectId: number;
        fileId: number;
        name: string;
        description: string;
        replaceContent: boolean;
        file?: File;
      },
      { rejectWithValue }
    ) => {
      try {
        const response = await axiosInstance.put(
          `/clients/${clientId}/projects/${projectId}/files/${fileId}/update`,
          {
            fileName: name,
            description,
            replaceContent
          }
        );
  
        const updatedFile = response.data;
  
        if (replaceContent && updatedFile.uploadUrl && file) {
          // מעלה את הקובץ החדש ל-S3 באותו path
          await axios.put(updatedFile.uploadUrl, file, {
            headers: {
              'Content-Type': file.type
            }
          });
        }
  
        return updatedFile;
      } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || 'Failed to update file.');
      }
    }
  );
  
  
  // Compare two plans
export const comparePlans = createAsyncThunk<
Blob, 
{ clientId: number; projectId: number ; fileId1: number; fileId2: number }
>(
'files/comparePlans',
async ({ clientId, projectId, fileId1, fileId2 }, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get(
      `/clients/${clientId}/projects/${projectId}/files/compare-plans/${fileId1}/${fileId2}`,
      { responseType: 'blob' } // כדי לקבל את התמונה כ-Blob
    );
    return response.data; // נחזיר Blob
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || 'Comparison failed.');
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
      }).addCase(deleteFile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteFile.fulfilled, (state, action: PayloadAction<number>) => {
        state.files = state.files.filter(file => file.id !== action.payload);
        state.loading = false;
      })
      .addCase(deleteFile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      }).addCase(fetchFileUrl.fulfilled, (state, action) => {
        state.selectedFileUrl = action.payload; // כאן נשמר ה-URL שהגיע
        state.loading = false;
      })
      .addCase(fetchFileUrl.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFileUrl.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      .addCase(updateFile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateFile.fulfilled, (state, action) => {
        const updatedFile = action.payload;
        const index = state.files.findIndex(file => file.id === updatedFile.id);
        if (index !== -1) {
          state.files[index] = updatedFile;
        }
        state.loading = false;
        window.location.reload();
      })
      .addCase(updateFile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default filesSlice.reducer;

