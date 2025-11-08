import { motion } from "framer-motion";

interface StatusCounts {
  all: number;
  pending: number;
  accepted: number;
  completed: number;
  cancelled: number;
  rejected: number;
}

type FilterStatus = keyof StatusCounts;
type SortOption = "newest" | "oldest" | "amount-high" | "amount-low";

interface OrderFiltersProps {
  statusCounts: StatusCounts;
  activeFilter: FilterStatus;
  onFilterChange: (filter: FilterStatus) => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
}

const OrderFilters = ({
  statusCounts,
  activeFilter,
  onFilterChange,
  sortBy,
  onSortChange,
}: OrderFiltersProps) => {
  const filters: { key: FilterStatus; label: string }[] = [
    { key: "all", label: "All Orders" },
    { key: "pending", label: "Pending" },
    { key: "accepted", label: "Shipped" },
    { key: "completed", label: "Delivered" },
    { key: "cancelled", label: "Cancelled" },
  ];

  const sortOptions: { value: SortOption; label: string }[] = [
    { value: "newest", label: "Newest First" },
    { value: "oldest", label: "Oldest First" },
    { value: "amount-high", label: "Highest Amount" },
    { value: "amount-low", label: "Lowest Amount" },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white border border-stone-200 rounded-sm p-5 md:p-6"
    >
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        {/* Status Filters */}
        <div className="flex-1 overflow-x-auto scrollbar-hide -mx-2 px-2">
          <div className="flex gap-2 pb-2">
            {filters.map((filter, index) => (
              <motion.button
                key={filter.key}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onFilterChange(filter.key)}
                className={`px-4 py-2.5 rounded-sm text-sm font-light whitespace-nowrap transition-all duration-300 ${
                  activeFilter === filter.key
                    ? "bg-stone-900 text-white"
                    : "bg-stone-100 text-stone-700 hover:bg-stone-200"
                }`}
              >
                <span className="tracking-wide">{filter.label}</span>
                <span className={`ml-2 text-xs ${
                  activeFilter === filter.key ? "opacity-80" : "opacity-60"
                }`}>
                  ({statusCounts[filter.key]})
                </span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <label className="text-xs uppercase tracking-wider text-stone-500 font-medium whitespace-nowrap">
            Sort By
          </label>
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value as SortOption)}
              className="px-4 py-2.5 bg-stone-50 border border-stone-200 text-stone-900 rounded-sm text-sm focus:outline-none focus:border-stone-300 transition-colors appearance-none cursor-pointer font-light pr-10 min-w-[180px]"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <svg 
              className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 pointer-events-none" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth={1.5} 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Custom CSS for hiding scrollbar */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </motion.div>
  );
};

export default OrderFilters;
