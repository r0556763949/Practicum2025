import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import type { RootState } from "./Store"

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

export const fetchQuestionnaireFills = createAsyncThunk(
  "questionnaireFill/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("https://localhost:7156/api/QuestionnaireFill")
      if (!response.ok) {
        throw new Error("Failed to fetch questionnaire fills")
      }
      return await response.json()
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  },
)

export const fetchQuestionnaireFillById = createAsyncThunk(
  "questionnaireFill/fetchById",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await fetch(`https://localhost:7156/api/QuestionnaireFill/${id}`)
      if (!response.ok) {
        throw new Error("Failed to fetch questionnaire fill")
      }
      return await response.json()
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  },
)
export const fetchQuestionnaireFillsByClientId = createAsyncThunk(
  "questionnaireFill/fetchByClientId",
  async (clientId: number, { rejectWithValue }) => {
    try {
      const response = await fetch(`https://localhost:7156/api/QuestionnaireFill/client/${clientId}`)
      if (!response.ok) {
        throw new Error("Failed to fetch questionnaire fills by client")
      }
      return await response.json()
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
)

export const createQuestionnaireFill = createAsyncThunk(
  "questionnaireFill/create",
  async (data: { questionnaireId: number; clientId?: number; projectId?: number }, { rejectWithValue }) => {
    try {
      const response = await fetch("https://localhost:7156/api/QuestionnaireFill", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
      if (!response.ok) {
        throw new Error("Failed to create questionnaire fill")
      }
      return await response.json()
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  },
)

export const updateQuestionnaireFillSummary = createAsyncThunk(
  "questionnaireFill/updateSummary",
  async ({ id, clientId }: { id: number; clientId: number }, { rejectWithValue }) => {
    try {
      const response = await fetch(`https://localhost:7156/api/QuestionnaireFill/summarize/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(clientId),
      })
      if (!response.ok) {
        throw new Error("Failed to update questionnaire fill summary")
      }
      return { id, clientId }
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  },
)

export const deleteQuestionnaireFill = createAsyncThunk(
  "questionnaireFill/delete",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await fetch(`https://localhost:7156/api/QuestionnaireFill/${id}`, {
        method: "DELETE",
      })
      if (!response.ok) {
        throw new Error("Failed to delete questionnaire fill")
      }
      return id
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  },
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

export const { clearCurrentQuestionnaireFill } = questionnaireFillSlice.actions

// export const selectQuestionnaireFills = (state: RootState) => state.questionnaireFill.questionnaireFills
// export const selectCurrentQuestionnaireFill = (state: RootState) => state.questionnaireFill.currentQuestionnaireFill
// export const selectQuestionnaireFillLoading = (state: RootState) => state.questionnaireFill.loading
// export const selectQuestionnaireFillError = (state: RootState) => state.questionnaireFill.error

export default questionnaireFillSlice.reducer
