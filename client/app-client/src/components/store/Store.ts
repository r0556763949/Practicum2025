import { configureStore } from '@reduxjs/toolkit';
import filesReducer from './FileSlice'; // סלאיס הקבצים
import remarksReducer from './ReMarkSlice';
import projectsReducer  from './ProjectSlice'
import ClientSlice from './ClientSlice';
import questionnaireSlice from './QuestionnaireSlice';
import QuestionnaireFillSlice from './QuestionnaireFillSlice';

const store = configureStore({
  reducer: {
    files: filesReducer,
    remarks: remarksReducer,
    projects:projectsReducer,
    clients:ClientSlice,
    questionnaires:questionnaireSlice,
    questionnairesFill:QuestionnaireFillSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;


