import {useState, useEffect} from 'react';
import { Button } from '@mui/material';
import CreateModal from './components/CreateModal';
import Tickets from './components/Tickets';
import EditModal from './components/EditModal';
import { store as editTicketStore, store } from './store/editTicketModal';
import './App.css';
import 'react-notifications-component/dist/theme.css';
import { ReactNotifications } from 'react-notifications-component'

function App() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const openCreateModal = () => setIsCreateModalOpen(true);
  const closeCreateModal = () => setIsCreateModalOpen(false);

  const openEditModal = () => setIsEditModalOpen(true);
  const closeEditModal = () => setIsEditModalOpen(false);

  useEffect(() => {
    editTicketStore.subscribe(() => {
      store.getState().isOpen ? openEditModal() : closeEditModal();
    });
  });

  return (
      <>
        <ReactNotifications />
        <div className="App">
          <Button variant="contained" color="success" onClick={openCreateModal}>Create</Button>
          <Tickets />
          <CreateModal isOpen={isCreateModalOpen} close={closeCreateModal}/>
          <EditModal isOpen={isEditModalOpen} close={closeEditModal}/>
        </div>
    </>
  );
}

export default App;
