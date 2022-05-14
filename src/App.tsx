import React from 'react';
import './App.css';
import TicketCard from './components/TicketCard';
import { Box, List } from '@mui/material';
import Status from './interfaces/Status';

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

function App() {
  return (
    <div className="App">
      <Box sx={{ display: 'flex' }}>
        <List sx={style} component="nav" aria-label="mailbox folders">
          <h2>Todo</h2>
          <TicketCard ticket={ticket} />
          <TicketCard ticket={ticket} />
          <TicketCard ticket={ticket} />
          <TicketCard ticket={ticket} />
        </List>
        <List sx={style} component="nav" aria-label="mailbox folders">
          <h2>In progress</h2>
          <TicketCard ticket={ticket} />
          <TicketCard ticket={ticket} />
          <TicketCard ticket={ticket} />
        </List>
        <List sx={style} component="nav" aria-label="mailbox folders">
          <h2>In review</h2>
          <TicketCard ticket={ticket} />
        </List>
        <List sx={style} component="nav" aria-label="mailbox folders">
          <h2>Done</h2>
          <TicketCard ticket={ticket} />
          <TicketCard ticket={ticket} />
        </List>
      </Box>
    </div>
  );
}

export default App;
