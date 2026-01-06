import { useLocation } from "react-router-dom";
import TicketDetails from "../../../components/common/TicketDetails";

const UserTicketDetailsPage = () => {
  const { state } = useLocation();

  const ticket = state?.ticket ?? null;

  return <TicketDetails ticket={ticket} role="user" />;
};

export default UserTicketDetailsPage;
