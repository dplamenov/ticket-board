import { useState } from 'react';
import { Button, Box, Typography, Modal, TextField, InputLabel, MenuItem, FormControl } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Status from '../interfaces/Status';
import { store, create } from '../store/tickets';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

function EditModal({ isOpen, close }: { isOpen: boolean, close: () => void }) {
  const [label, setLabel] = useState('');
  const [estimationValue, setEstimationValue] = useState('');
  const [assignedUser, setAssignedUser] = useState('');
  const [status, setStatus] = useState(0);

  const handleEdit = () => {
    store.dispatch(create({ label, estimationValue, username: assignedUser, status }));
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
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <Box sx={style}>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        Create ticket
      </Typography>
      <TextField fullWidth label="label" id="label" onChange={handleLabelChange} value={label} />
      <TextField fullWidth label="estimation value" id="estimation-value" onChange={handleEstimationValueChange} value={estimationValue} />
      <TextField fullWidth label="assigned user" id="assigned-user" onChange={handleUserChange} value={assignedUser} />
      <FormControl fullWidth>
        <InputLabel id="status-label">Status</InputLabel>
        <Select
          labelId="status-label"
          id="status-select"
          label="Status"
          value={status.toString()}
          sx={{ width: '100%' }}
          onChange={handleStatusChange}
        >
          {Object.values(Status).filter((v) => !isNaN(Number(v))).map(e => {
            return <MenuItem key={e} value={e}>{Status[+e]}</MenuItem>
          })}
        </Select>
      </FormControl>
      <Button variant="contained" color="success" sx={{ marginTop: '10px' }} onClick={handleEdit}>Edit</Button>
    </Box>
  </Modal>
}

export default EditModal;