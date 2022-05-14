import { createSlice, configureStore } from '@reduxjs/toolkit'
import { Status, Ticket } from '../interfaces';
import { v4 as uuidv4 } from 'uuid';

const ticketsSlice = createSlice({
  name: 'tickets',
  initialState: (JSON.parse(localStorage.getItem('tickets') as string) || {
    [Status.ToDo]: ([] as Ticket[]), [Status.InProgress]: ([] as Ticket[]), [Status.InReview]: ([] as Ticket[]), [Status.Done]: ([] as Ticket[])
}),
  reducers: {
    create: (state, action) => {
      const ticket = { ...action.payload, id: uuidv4(), assignedUser: { username: action.payload.username } };
      state[ticket.status] = [...state[ticket.status], ticket];
      return state;
    },
    deleteTicket: (state, action) => {
      state[action.payload.status] = state[action.payload.status].filter((ticket: Ticket) => ticket.id !== action.payload.id);
      return state; 
    },
    editTicket: (state, action) => {
      const ticket = action.payload.ticket;
      const oldStatus = action.payload.oldStatus;
      state[oldStatus] = state[oldStatus].filter((t: Ticket) => t.id !== ticket.id);
      state[ticket.status] = [...state[ticket.status], ticket];
      return state;
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