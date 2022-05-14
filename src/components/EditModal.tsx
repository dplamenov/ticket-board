import React, { useState, useEffect } from 'react';
import { Button, Box, Typography, Modal, TextField, InputLabel, MenuItem, FormControl, Select } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import { store as ticketStore, editTicket } from '../store/tickets';
import { store as editTicketStore, hide as storeHide} from '../store/editTicketModal';
import { Status, Ticket } from '../interfaces';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

function EditModal({ isOpen, close }: { isOpen: boolean, close: () => void }) {
  const [ticket, setTicket] = useState<Ticket>();
  const [oldStatus, setOldStatus] = useState<Status>();

  useEffect(() => {
    editTicketStore.subscribe(() => {
      const ticket = editTicketStore.getState().ticket as Ticket;
      setTicket(ticket);
      setOldStatus(ticket?.status as Status);
    });
  }, []);

  const handleEdit = () => {
    ticketStore.dispatch(editTicket({ ticket, oldStatus }));
    editTicketStore.dispatch(storeHide());
  };

  const handleLabelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTicket(t => ({ ...t, label: event.target.value} as Ticket))
  };

  const handleEstimationValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTicket(t => ({ ...t, estimationValue: event.target.value } as Ticket))
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTicket(t => ({ ...t, assignedUser: { username: event.target.value } } as Ticket))
  };

  const handleStatusChange = (event: SelectChangeEvent) => {
    setTicket(t => ({ ...t, status: +event.target.value } as Ticket))
  };

  return <Modal
    open={isOpen}
    onClose={close}
    aria-labelledby="edit-ticket"
  >
    <Box sx={style}>
      <Typography variant="h6" component="h2">
        Edit ticket
      </Typography>
      <TextField fullWidth label="label" id="label" onChange={handleLabelChange} value={ticket?.label} margin="dense"/>
      <TextField fullWidth label="estimation value" id="estimation-value" onChange={handleEstimationValueChange} value={ticket?.estimationValue} margin="dense"/>
      <TextField fullWidth label="assigned user" id="assigned-user" onChange={handleUserChange} value={ticket?.assignedUser.username} margin="dense"/>
      <FormControl fullWidth margin="dense">
        <InputLabel id="status-label">Status</InputLabel>
        <Select
          labelId="status-label"
          id="status-select"
          label="Status"
          value={ticket?.status.toString()}
          sx={{ width: '100%' }}
          onChange={handleStatusChange}
        >
          {Object.values(Status).filter((v) => !isNaN(Number(v))).map(e => {
            return <MenuItem key={e} value={e}>{Status[+e]}</MenuItem>
          })}
        </Select>
      </FormControl>
      <Button variant="contained" color="success" sx={{ marginTop: '20px' }} onClick={handleEdit}>Edit</Button>
      <Button variant="contained" color="warning" sx={{ marginTop: '20px', marginLeft: '10px' }} onClick={close}>Close</Button>
    </Box>
  </Modal>
}

export default EditModal;