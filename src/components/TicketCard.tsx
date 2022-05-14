import ListItem from '@mui/material/ListItem';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function TicketCard({ticket}: {ticket: any}) {
  return (
    <ListItem>
      <Card sx={{ width: "100%" }}>
        <CardContent>
          <Typography variant="h5" component="div">
            {ticket.label}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            user: {ticket.user.username}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            value: {ticket.estimationValue}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Edit</Button>
          <Button size="small">Delete</Button>
        </CardActions>
      </Card>
    </ListItem>
  );
}

export default TicketCard;