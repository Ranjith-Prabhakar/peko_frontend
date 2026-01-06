type Props = {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
};

const Pagination = ({ page, totalPages, onChange }: Props) => {
  return (
    <div className="join mt-6 justify-center">
      <button
        className="join-item btn"
        disabled={page === 1}
        onClick={() => onChange(page - 1)}
      >
        Prev
      </button>

      <button className="join-item btn btn-disabled">
        {page} / {totalPages}
      </button>

      <button
        className="join-item btn"
        disabled={page === totalPages}
        onClick={() => onChange(page + 1)}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
