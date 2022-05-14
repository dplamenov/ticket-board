import Status from "./Status";
import User from "./User";

interface Ticket {
  id: string,
  label: string,
  estimationValue: string,
  assignedUser: User,
  status: Status
}

export default Ticket;