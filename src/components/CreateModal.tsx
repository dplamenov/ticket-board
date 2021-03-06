import React, { useState } from 'react';
import { Button, Box, Typography, Modal, TextField, InputLabel, MenuItem, FormControl, Select } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import { store, create } from '../store/tickets';
import { Status } from '../interfaces';
import modalStyles from '../styles/modalStyles';
import showNotifacion from '../notification';

function CreateModal({ isOpen, close }: { isOpen: boolean, close: () => void}) {
  const [label, setLabel] = useState('');
  const [estimationValue, setEstimationValue] = useState('');
  const [assignedUser, setAssignedUser] = useState('');
  const [status, setStatus] = useState(0);

  const handleCreate = () => {
    if (label.length < 3 || estimationValue.length < 3 || assignedUser.length < 3) {
      showNotifacion('Incorrect length', 'All lengths must be at least three symbols', 'warning');
      return;
    }

    store.dispatch(create({ label, estimationValue, username: assignedUser, status }));
    showNotifacion('Success', 'Successfully created', 'success');
    setLabel('');
    setEstimationValue('');
    setAssignedUser('');
    setStatus(0);
    close();
  }; 

  const handleLabelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLabel(event.target.value);
  };

  const handleEstimationValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEstimationValue(event.target.value);
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAssignedUser(event.target.value);
  };

  const handleStatusChange = (event: SelectChangeEvent) => {
    setStatus(+event.target.value);
  };
  
  return <Modal
    open={isOpen}
    onClose={close}
    aria-labelledby="create-ticket"
  >
    <Box sx={modalStyles}>
      <Typography variant="h6" component="h2">
       Create ticket
      </Typography>
      <TextField fullWidth label="label" id="label" onChange={handleLabelChange} value={label} margin="dense"/>
      <TextField fullWidth label="estimation value" id="estimation-value" onChange={handleEstimationValueChange} value={estimationValue} margin="dense"/>
      <TextField fullWidth label="assigned user" id="assigned-user" onChange={handleUserChange} value={assignedUser} margin="dense"/>
      <FormControl fullWidth margin="dense">
        <InputLabel id="status-label">Status</InputLabel>
        <Select
          labelId="status-label"
          id="status-select"
          label="Status"
          value={status.toString()}
          sx={{ width: '100%' }}
          onChange={handleStatusChange}
        >
          {Object.keys(Status).filter((v) => !isNaN(Number(v))).map(key => (
            <MenuItem key={key} value={key}>{Status[+key]}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button variant="contained" color="success" sx={{ marginTop: '20px' }} onClick={handleCreate}>Create</Button>
      <Button variant="contained" color="warning" sx={{ marginTop: '20px', marginLeft: '10px' }} onClick={close}>Close</Button>
    </Box>
  </Modal>
}

export default CreateModal;