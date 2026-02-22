import { createSlice, type PayloadAction } from "@reduxjs/toolkit";



export const EMPLOYEES_INITIAL_STATE = {
   filters: {
    search: '',
    deparment: ''
   }
}
const employeesSlice = createSlice({
  name: 'employees',
  initialState: EMPLOYEES_INITIAL_STATE,
  reducers: {
    setFilters: (state, action: PayloadAction<any>) => {

    }
  },
})

export const {setFilters} = employeesSlice.actions
export default employeesSlice.reducer