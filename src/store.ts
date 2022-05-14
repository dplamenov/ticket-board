import { createSlice, configureStore } from '@reduxjs/toolkit'
import Ticket from './interfaces/Ticket';

const ticketsSlice = createSlice({
  name: 'tickets',
  initialState: (JSON.parse(localStorage.getItem('tickets') as string) || []) as Ticket[],
  reducers: {
    create: (state, action) => {
      state.push({ ...action.payload });
    }
  }
});

export const { create } = ticketsSlice.actions

export const store = configureStore({
  reducer: ticketsSlice.reducer
})

store.subscribe(() => {
  localStorage.setItem('tickets', JSON.stringify(store.getState()));
});