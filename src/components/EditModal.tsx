import React, { useState, useEffect } from 'react';
import { Button, Box, Typography, Modal, TextField, InputLabel, MenuItem, FormControl, Select } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import { store as ticketStore, editTicket } from '../store/tickets';
import { store as editTicketStore, hide as storeHide} from '../store/editTicketModal';
import { Status, Ticket } from '../interfaces';
import modalStyles from '../styles/modalStyles';
import showNotifacion from '../notification';

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
    if ((ticket?.label as string).length < 3 || (ticket?.estimationValue as string).length < 3 || (ticket?.assignedUser.username as string).length < 3) {
      showNotifacion('Incorrect length', 'All lengths must be at least three symbols', 'warning');
      return;
    }
    
    ticketStore.dispatch(editTicket({ ticket, oldStatus }));
    showNotifacion('Success', 'Successfully edited', 'success');
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
    <Box sx={modalStyles}>
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
          {Object.keys(Status).filter((v) => !isNaN(Number(v))).map(key => (
            <MenuItem key={key} value={key}>{Status[+key]}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button variant="contained" color="success" sx={{ marginTop: '20px' }} onClick={handleEdit}>Edit</Button>
      <Button variant="contained" color="warning" sx={{ marginTop: '20px', marginLeft: '10px' }} onClick={close}>Close</Button>
    </Box>
  </Modal>
}

export default EditModal;