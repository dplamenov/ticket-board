import React from 'react';
import './App.css';
import TicketCard from './components/TicketCard';
import { Box, Button, List } from '@mui/material';
import Status from './interfaces/Status';
import CreateModal from './components/CreateModal';

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
  const [isCreateModalOpen, setIsCreateModalOpen] = React.useState(false);
  const openCreateModal = () => setIsCreateModalOpen(true);
  const closeCreateModal = () => setIsCreateModalOpen(false);

  return (
    <div className="App">
      <Button variant="contained" color="success" onClick={openCreateModal}>Create</Button>
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
      <CreateModal isOpen={isCreateModalOpen} open={openCreateModal} close={closeCreateModal}/>
    </div>
  );
}

export default App;
