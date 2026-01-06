import { useEffect, useState } from "react";
import useGetUser from "../../../hooks/useGetUser";
import { fetchTicket } from "../../../services/ticket/fetch";
import { type Ticket } from "./TicketTable";

const useTableHook = () => {
  const user = useGetUser();
  const isAdmin = user?.role === "admin";

  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadTickets = async () => {
      try {
        setLoading(true);

        const res = await fetchTicket(page);

        if (!isMounted) return;

        setTickets(res.data);
        setTotalPages(res.totalPages);
      } catch (err) {
        console.error(err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadTickets();

    return () => {
      isMounted = false;
    };
  }, [page]);

  return {
    tickets,
    isAdmin,
    page,
    setPage,
    totalPages,
    loading
  };
};

export default useTableHook;
