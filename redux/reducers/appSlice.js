import { createSlice } from '@reduxjs/toolkit'

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    inputOpen: false,
  },
  reducers: {
    setInputOpen: (state) => {
      if(state.inputOpen === false){
        state.inputOpen = true
      }else{
        state.inputOpen = false
      }
    },
  },
})

export const { setInputOpen } = appSlice.actions

export const selectInputOpen = (state) => state.app.inputOpen

export default appSlice.reducer