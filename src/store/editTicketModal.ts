import { createSlice, configureStore } from '@reduxjs/toolkit'

const editTicketModalSlice = createSlice({
  name: 'editTicketModal',
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

export const { show, hide } = editTicketModalSlice.actions

export const store = configureStore({
  reducer: editTicketModalSlice.reducer
})
