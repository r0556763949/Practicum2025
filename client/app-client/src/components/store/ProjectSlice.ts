import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

// הגדרת סוגי הנתונים
export interface Project {
  id: number;
  description: string;
  address: string;
  startAt: string;
}

export interface ProjectDto {
  id: number;
  description: string;
  address: string;
  startAt: string;
}

interface ProjectState {
  projects: ProjectDto[];
  loading: boolean;
  error: string | null;
}

const initialState: ProjectState = {
  projects: [],
  loading: false,
  error: null,
};

// Fetch all projects for a specific client
export const fetchProjectsByClientId = createAsyncThunk<ProjectDto[], number>(
  'projects/fetchProjectsByClientId',
  async (clientId, { rejectWithValue }) => {
    try {
      const response = await axios.get<ProjectDto[]>(
        `https://localhost:7156/api/clients/${clientId}/projects`
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch projects.');
    }
  }
);

// Fetch a specific project
export const fetchProject = createAsyncThunk<ProjectDto, { clientId: number; projectId: number }>(
  'projects/fetchProject',
  async ({ clientId, projectId }, { rejectWithValue }) => {
    try {
      const response = await axios.get<ProjectDto>(
        `https://localhost:7156/api/clients/${clientId}/projects/${projectId}`
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch project.');
    }
  }
);

// Create a new project
export const createProject = createAsyncThunk<ProjectDto, { clientId: number; projectData: Omit<ProjectDto, 'id'> }>(
  'projects/createProject',
  async ({ clientId, projectData }, { rejectWithValue }) => {
    try {
      const response = await axios.post<ProjectDto>(
        `https://localhost:7156/api/clients/${clientId}/projects`,
        projectData,
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create project.');
    }
  }
);

// Slice
const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjectsByClientId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjectsByClientId.fulfilled, (state, action: PayloadAction<ProjectDto[]>) => {
        state.projects = action.payload;
        state.loading = false;
      })
      .addCase(fetchProjectsByClientId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProject.fulfilled, (state, action: PayloadAction<ProjectDto>) => {
        const projectIndex = state.projects.findIndex((p) => p.id === action.payload.id);
        if (projectIndex === -1) {
          state.projects.push(action.payload);
        } else {
          state.projects[projectIndex] = action.payload;
        }
        state.loading = false;
      })
      .addCase(fetchProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProject.fulfilled, (state, action: PayloadAction<ProjectDto>) => {
        state.projects.push(action.payload);
        state.loading = false;
      })
      .addCase(createProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default projectsSlice.reducer;
