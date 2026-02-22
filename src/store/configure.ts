import { configureStore } from "@reduxjs/toolkit"
import employeesSlice from './employees'



 export const store = configureStore({
  reducer: {
    employees:employeesSlice,
  },
  // preloadedState: getPreloadedState(),

})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
