import { createSlice, configureStore } from '@reduxjs/toolkit'

const editTicketsSlice = createSlice({
  name: 'editTickets',
  initialState: {isOpen: false, ticket: {}},
  reducers: {
    show: (state, action) => {
      state.isOpen = true;
      state.ticket = action.payload;
      return state;
    },
    hide: (state) => {
      state.isOpen = false;
      return state;
    },
  }
});

export const { show, hide } = editTicketsSlice.actions

export const store = configureStore({
  reducer: editTicketsSlice.reducer
})
