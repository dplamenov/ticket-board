import { ListItem, Card, CardActions, CardContent, Button, Typography } from '@mui/material';
import { store as ticketStore, deleteTicket } from '../store/tickets';
import { store as editTicketStore, show } from '../store/editTicketModal';
import { Ticket } from '../interfaces';
import showNotifacion from '../notification';

function TicketCard({ticket}: {ticket: Ticket}) {
  const handleDelete = () => {
    showNotifacion('Success', 'Successfully deleted', 'success');
    ticketStore.dispatch(deleteTicket({id: ticket.id, status: ticket.status}));
  };

  const handleEdit = () => {
    editTicketStore.dispatch(show(ticket));
  };

  return (
    <ListItem>
        <Card sx={{ width: "100%" }}>
          <CardContent>
            <Typography variant="h5" component="div">
              {ticket.label}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              user: {ticket.assignedUser.username}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              value: {ticket.estimationValue}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" onClick={handleEdit}>Edit</Button>
            <Button size="small" onClick={handleDelete}>Delete</Button>
          </CardActions>
        </Card>
    </ListItem>
  );
}

export default TicketCard;