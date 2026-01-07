import TicketTable from "./TicketTable";
import Pagination from "../../../common/Pagination";
import useTableHook from "./hook";

const TableWrapper = () => {
  const { tickets, isAdmin, page, setPage, totalPages, loading } =
    useTableHook();

  if (loading) return <div>Loading tickets...</div>;

  return (
    <div className="w-full h-full flex flex-col items-stretch justify-start px-6 pt-6 text-white">
      <h1 className="text-xl font-bold mb-4  ms-5">
        {isAdmin ? "All Tickets" : "My Tickets"}
      </h1>

      <TicketTable tickets={tickets} isAdmin={isAdmin} />

      <div className="mt-6 w-full flex justify-center">
        <Pagination
            page={page}
            totalPages={totalPages}
            onChange={setPage}
        />
        </div>

    </div>
  );
};

export default TableWrapper;
