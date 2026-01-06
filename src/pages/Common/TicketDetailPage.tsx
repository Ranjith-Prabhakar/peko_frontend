import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

type Props = {
  isAdmin: boolean;
};

const TicketDetailPage = ({ isAdmin }: Props) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/ticket/${id}`, {
      credentials: "include"
    })
      .then(res => res.json())
      .then(res => setTicket(res.data))
      .finally(() => setLoading(false));

    if (isAdmin) {
      fetch(`/ticket/${id}/viewed`, {
        method: "PATCH",
        credentials: "include"
      });
    }
  }, [id, isAdmin]);

  if (loading) return <div>Loading ticket...</div>;
  if (!ticket) return <div>Ticket not found</div>;

  return (
    <div className="max-w-3xl mx-auto">
      <button
        className="btn btn-sm btn-ghost mb-4"
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>

      <div className="card bg-base-100 shadow p-6">
        <h2 className="text-2xl font-bold mb-2">
          {ticket.title}
        </h2>

        <p className="mb-4 text-gray-600">
          {ticket.description}
        </p>

        <div className="flex gap-4 text-sm">
          <span className="badge badge-outline">
            Priority: {ticket.priority}
          </span>

          <span className="badge badge-outline">
            Status: {ticket.status}
          </span>

          {isAdmin && (
            <span className="badge badge-outline">
              Viewed: {ticket.isViewedByAdmin ? "Yes" : "No"}
            </span>
          )}
        </div>

        {/* future: status change / chat / assign admin */}
      </div>
    </div>
  );
};

export default TicketDetailPage;
