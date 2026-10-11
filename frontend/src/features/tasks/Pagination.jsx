import Button from "../../components/ui/Button.jsx";

const Pagination = ({ page, totalPages, setPage }) => {
  const handlePrev = () => {
    if (page <= 1) return;
    setPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (page >= totalPages) return;
    setPage((prev) => prev + 1);
  };

  return (
    <div className="flex items-center justify-center gap-4 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
      <Button variant="secondary" type="button" onClick={handlePrev} disabled={page <= 1}>
        Prev
      </Button>

      <span className="min-w-24 text-center text-sm font-medium text-slate-600">
        Page <span className="text-slate-900">{page}</span> of {totalPages}{" "}
      </span>

      <Button variant="secondary" type="button" onClick={handleNext} disabled={page >= totalPages}>
        Next
      </Button>
    </div>
  );
};
export default Pagination;
