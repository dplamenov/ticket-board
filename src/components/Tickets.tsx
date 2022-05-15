import { useState, useEffect } from 'react';
import { Box, List } from '@mui/material';
import { store } from '../store/tickets';
import { Ticket } from '../interfaces';
import TicketCard from '../components/TicketCard';

const style = {
  width: '100%',
  bgcolor: 'background.paper',
};

function Tickets() {
  const [tickets, setTickets] = useState<Ticket[][]>([]);

  useEffect(() => {
    setTickets(store.getState());
    store.subscribe(() => {
      setTickets(store.getState());
    });
  }, []);

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <List sx={style}>
          <h2>Todo</h2>
          {(tickets[0] || []).map((ticket, key) => {
            return <TicketCard key={key} ticket={ticket} />
          })}
        </List>
        <List sx={style}>
          <h2>In progress</h2>
          {(tickets[1] || []).map((ticket, key) => {
            return <TicketCard key={key} ticket={ticket} />
          })}
        </List>
        <List sx={style}>
          <h2>In review</h2>
          {(tickets[2] || []).map((ticket, key) => {
            return <TicketCard key={key} ticket={ticket} />
          })}
        </List>
        <List sx={style}>
          <h2>Done</h2>
          {(tickets[3] || []).map((ticket, key) => {
            return <TicketCard key={key} ticket={ticket} />
          })}
        </List>
      </Box>
      {tickets.length === 0 && <p>No tickets.</p>}
    </>
  )
}

export default Tickets;