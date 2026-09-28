import { ArrowUpDown, Search } from "lucide-react";
import "./FilterBar.css";

const FilterBar = ({
  search,
  setSearch,
  statusFilter,
  setStatusFilter,
  sortBy,
  setSortBy,
}) => {
  return (
    <section className="filter-bar">
      <div className="filter-bar__search">
        <Search size={19} />

        <input
          type="text"
          value={search}
          placeholder="Search by name, position or company..."
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>

      <select
        value={statusFilter}
        onChange={(event) => setStatusFilter(event.target.value)}
      >
        <option value="all">All statuses</option>
        <option value="pending">Pending</option>
        <option value="interview">Interview</option>
        <option value="accepted">Accepted</option>
        <option value="rejected">Rejected</option>
      </select>

      <div className="filter-bar__sort">
        <ArrowUpDown size={18} />

        <select
          value={sortBy}
          onChange={(event) => setSortBy(event.target.value)}
        >
          <option value="newest">Newest first</option>
          <option value="oldest">Oldest first</option>
          <option value="salary-high">Highest salary</option>
          <option value="salary-low">Lowest salary</option>
        </select>
      </div>
    </section>
  );
};

export default FilterBar;
