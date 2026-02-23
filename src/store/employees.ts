import { createSlice, type PayloadAction } from "@reduxjs/toolkit";



export const EMPLOYEES_INITIAL_STATE = {
   filters: {
    search: '',
    department: "",
   }
}
const employeesSlice = createSlice({
  name: 'employees',
  initialState: EMPLOYEES_INITIAL_STATE,
  reducers: {
    setFilters: (state, action: PayloadAction<{name: string, value: string | number}>) => {
      const {name, value} = action.payload
      state.filters = {
        ...state.filters,
        [name]: value
      }

    },
    setFiltersFromStorage: (state, action: PayloadAction<{ search: string; department: string }>) => {
      state.filters = action.payload;
    },
  },
})

export const {setFilters, setFiltersFromStorage} = employeesSlice.actions
export default employeesSlice.reducer