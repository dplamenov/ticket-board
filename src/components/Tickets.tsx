import React, { useState, useEffect } from 'react';
import { store } from '../store';
import Ticket from '../interfaces/Ticket';
import Status from '../interfaces/Status';
import { Box, List } from '@mui/material';
import TicketCard from '../components/TicketCard';

const ticket = {
  id: '1',
  label: 'test',
  estimationValue: '2 days',
  assignedUser: {
    username: 'dimitar'
  },
  status: Status.InReview
};

const style = {
  width: '100%',
  bgcolor: 'background.paper',
};

function Tickets() {
  const [tickets, setTickets] = useState<Ticket[]>([]);

  useEffect(() => {
    setTickets(store.getState());
    store.subscribe(() => {
      setTickets(store.getState());
    });
  }, []);
  
  return (
    <Box sx={{ display: 'flex' }}>
      <List sx={style} component="nav" aria-label="mailbox folders">
        <h2>Todo</h2>
        {tickets.filter(ticket => ticket.status === Status.ToDo.valueOf()).map((ticket, key) => {
          return <TicketCard key={key} ticket={ticket}/>
        })}
      </List>
      <List sx={style} component="nav" aria-label="mailbox folders">
        <h2>In progress</h2>
        {tickets.filter(ticket => ticket.status === Status.InProgress.valueOf()).map((ticket, key) => {
          return <TicketCard key={key} ticket={ticket} />
        })}
      </List>
      <List sx={style} component="nav" aria-label="mailbox folders">
        <h2>In review</h2>
        {tickets.filter(ticket => ticket.status === Status.InReview.valueOf()).map((ticket, key) => {
          return <TicketCard key={key} ticket={ticket} />
        })}
      </List>
      <List sx={style} component="nav" aria-label="mailbox folders">
        <h2>Done</h2>
        {tickets.filter(ticket => ticket.status === Status.Done.valueOf()).map((ticket, key) => {
          return <TicketCard key={key} ticket={ticket} />
        })}
      </List>
    </Box>
  )
}

export default Tickets;