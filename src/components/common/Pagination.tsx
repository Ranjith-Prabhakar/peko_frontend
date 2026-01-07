type Props = {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
};

const Pagination = ({ page, totalPages, onChange }: Props) => {
  return (
    <div className="join mt-6 justify-center">
      <button
        className="
          join-item btn btn-sm
          min-w-[88px]
          rounded-l-lg
          bg-gray-900
          border border-white/20
          text-white
          transition-all duration-200
          hover:bg-indigo-500/10
          hover:border-indigo-400/40
          disabled:opacity-40
          disabled:hover:bg-gray-900
        "
        disabled={page === 1}
        onClick={() => onChange(page - 1)}
      >
        Prev
      </button>

      <button
        className="
          join-item btn btn-sm
          min-w-[96px]
          bg-gray-900
          border-t border-b border-white/30
          text-white
          cursor-default
          font-medium
        "
        disabled
      >
        {page} / {totalPages}
      </button>

      <button
        className="
          join-item btn btn-sm
          min-w-[88px]
          rounded-r-lg
          bg-gray-900
          border border-white/20
          text-white
          transition-all duration-200
          hover:bg-indigo-500/10
          hover:border-indigo-400/40
          disabled:opacity-40
          disabled:hover:bg-gray-900
        "
        disabled={page === totalPages}
        onClick={() => onChange(page + 1)}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
