import { createSlice, configureStore } from '@reduxjs/toolkit'
import Ticket from './interfaces/Ticket';
import { v4 as uuidv4 } from 'uuid';

const ticketsSlice = createSlice({
  name: 'tickets',
  initialState: (JSON.parse(localStorage.getItem('tickets') as string) || []) as Ticket[],
  reducers: {
    create: (state, action) => {
      return [...state, { ...action.payload, id: uuidv4(), assignedUser: { username: action.payload.username } }];
    },
    deleteTicket: (state, action) => {
      return state.filter(ticket => ticket.id !== action.payload.id);
    },
  }
});

export const { create, deleteTicket } = ticketsSlice.actions

export const store = configureStore({
  reducer: ticketsSlice.reducer
})

store.subscribe(() => {
  localStorage.setItem('tickets', JSON.stringify(store.getState()));
});