import { createSlice, configureStore } from '@reduxjs/toolkit'
import Ticket from '../interfaces/Ticket';
import { v4 as uuidv4 } from 'uuid';

const ticketsSlice = createSlice({
  name: 'tickets',
  initialState: (JSON.parse(localStorage.getItem('tickets') as string) || []) as Ticket[],
  reducers: {
    create: (state, action) => {
      const ticket = { ...action.payload, id: uuidv4(), assignedUser: { username: action.payload.username } };
      console.log(state, ticket);
      return [...state, ticket];
    },
    deleteTicket: (state, action) => {
      return state.filter(ticket => ticket.id !== action.payload.id);
    },
    editTicket: (state, action) => {
      return state.filter(ticket => ticket.id !== action.payload.id).concat(action.payload);
    }
  }
});

export const { create, deleteTicket, editTicket } = ticketsSlice.actions

export const store = configureStore({
  reducer: ticketsSlice.reducer
})

store.subscribe(() => {
  localStorage.setItem('tickets', JSON.stringify(store.getState()));
});