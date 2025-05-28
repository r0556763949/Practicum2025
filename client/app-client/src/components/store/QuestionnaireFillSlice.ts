import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axiosInstance from "./axiosInstance"


export interface QuestionnaireFill {
  id: number
  questionnaireId: number
  questionnaireName?: string
  clientId?: number
  projectId?: number
  email?: string
  getToFillAt: string
  filledAt?: string
  rawSummary?: string
  aiSummary?: string
}

interface QuestionnaireFillState {
  questionnaireFills: QuestionnaireFill[]
  loading: boolean
  error: string | null
  currentQuestionnaireFill: QuestionnaireFill | null
}

const initialState: QuestionnaireFillState = {
  questionnaireFills: [],
  loading: false,
  error: null,
  currentQuestionnaireFill: null,
}

//Get
export const fetchQuestionnaireFills = createAsyncThunk(
  "questionnaireFill/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("QuestionnaireFill")
      return response.data
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
)

//Get by id
export const fetchQuestionnaireFillById = createAsyncThunk(
  "questionnaireFill/fetchById",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`QuestionnaireFill/${id}`)
      return response.data
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
)

//Get by client id
export const fetchQuestionnaireFillsByClientId = createAsyncThunk(
  "questionnaireFill/fetchByClientId",
  async (clientId: number, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`QuestionnaireFill/client/${clientId}`)
      return response.data
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }

)

//Create
export const createQuestionnaireFill = createAsyncThunk(
  "questionnaireFill/create",
  async (data: { questionnaireId: number; clientId?: number; projectId?: number }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("QuestionnaireFill", data)
      return response.data
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
)

//Update by client
export const updateQuestionnaireFillSummary = createAsyncThunk(
  "questionnaireFill/updateSummary",
  async ({ id, clientId }: { id: number; clientId: number }, { rejectWithValue }) => {
    try {
      await axiosInstance.put(`QuestionnaireFill/summarize/${id}`, clientId)
      return { id, clientId }
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
)

//Delete
export const deleteQuestionnaireFill = createAsyncThunk(
  "questionnaireFill/delete",
  async (id: number, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`QuestionnaireFill/${id}`)
      return id
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
)

const questionnaireFillSlice = createSlice({
  name: "questionnaireFill",
  initialState,
  reducers: {
    clearCurrentQuestionnaireFill: (state) => {
      state.currentQuestionnaireFill = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all questionnaire fills
      .addCase(fetchQuestionnaireFills.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchQuestionnaireFills.fulfilled, (state, action) => {
        state.loading = false
        state.questionnaireFills = action.payload
      })
      .addCase(fetchQuestionnaireFills.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      // Fetch questionnaire fill by ID
      .addCase(fetchQuestionnaireFillById.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchQuestionnaireFillById.fulfilled, (state, action) => {
        state.loading = false
        state.currentQuestionnaireFill = action.payload
      })
      .addCase(fetchQuestionnaireFillById.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(fetchQuestionnaireFillsByClientId.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchQuestionnaireFillsByClientId.fulfilled, (state, action) => {
        state.loading = false
        state.questionnaireFills = action.payload
      })
      .addCase(fetchQuestionnaireFillsByClientId.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      // Create questionnaire fill
      .addCase(createQuestionnaireFill.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(createQuestionnaireFill.fulfilled, (state, action) => {
        state.loading = false
        state.questionnaireFills.push(action.payload)
        state.currentQuestionnaireFill = action.payload
      })
      .addCase(createQuestionnaireFill.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      // Update questionnaire fill summary
      .addCase(updateQuestionnaireFillSummary.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updateQuestionnaireFillSummary.fulfilled, (state) => {
        state.loading = false
      })
      .addCase(updateQuestionnaireFillSummary.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      // Delete questionnaire fill
      .addCase(deleteQuestionnaireFill.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(deleteQuestionnaireFill.fulfilled, (state, action) => {
        state.loading = false
        state.questionnaireFills = state.questionnaireFills.filter((fill) => fill.id !== action.payload)
        if (state.currentQuestionnaireFill?.id === action.payload) {
          state.currentQuestionnaireFill = null
        }
      })
      .addCase(deleteQuestionnaireFill.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export const { clearCurrentQuestionnaireFill } = questionnaireFillSlice.actions;
export default questionnaireFillSlice.reducer




