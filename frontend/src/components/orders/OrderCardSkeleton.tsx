const OrderCardSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden animate-pulse">
      <div className="p-4 md:p-6 border-b border-gray-100">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <div className="h-6 bg-gray-200 rounded w-40 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-32"></div>
          </div>
          <div className="h-8 bg-gray-200 rounded w-24"></div>
        </div>
        <div className="flex items-center justify-between mt-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
              <div className="h-3 bg-gray-200 rounded w-16 mt-2"></div>
            </div>
          ))}
        </div>
      </div>
      <div className="p-4 md:p-6">
        <div className="h-24 bg-gray-200 rounded-xl mb-4"></div>
        <div className="h-12 bg-gray-200 rounded-lg"></div>
      </div>
    </div>
  );
};

export default OrderCardSkeleton;
