import {useState} from 'react';
import './App.css';
import { Button } from '@mui/material';
import CreateModal from './components/CreateModal';
import Tickets from './components/Tickets';

function App() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const openCreateModal = () => setIsCreateModalOpen(true);
  const closeCreateModal = () => setIsCreateModalOpen(false);

  return (
    <div className="App">
      <Button variant="contained" color="success" onClick={openCreateModal}>Create</Button>
      <Tickets />
      <CreateModal isOpen={isCreateModalOpen} close={closeCreateModal}/>
    </div>
  );
}

export default App;
