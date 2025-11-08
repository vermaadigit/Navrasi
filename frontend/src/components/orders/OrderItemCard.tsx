import { motion } from "framer-motion";

interface OrderItem {
  productId: string;
  title: string;
  price: number;
  quantity: number;
  size?: string;
  color?: string;
  image?: string;
}

interface OrderItemCardProps {
  item: OrderItem;
}

const OrderItemCard = ({ item }: OrderItemCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="flex gap-4 p-4 bg-stone-50 rounded-sm hover:bg-stone-100 transition-colors group"
    >
      {item.image && (
        <div className="relative flex-shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-sm overflow-hidden bg-white border border-stone-200">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "https://via.placeholder.com/96?text=NAVRASI";
            }}
          />
        </div>
      )}
      
      <div className="flex-1 min-w-0">
        <h5 className="font-light text-stone-900 mb-2 line-clamp-2 text-sm md:text-base">
          {item.title}
        </h5>
        <div className="flex flex-wrap gap-2">
          <span className="inline-flex items-center px-2.5 py-1 bg-white border border-stone-200 rounded-sm text-xs font-light text-stone-700">
            Qty: {item.quantity}
          </span>
          {item.size && (
            <span className="inline-flex items-center px-2.5 py-1 bg-white border border-stone-200 rounded-sm text-xs font-light text-stone-700">
              Size: {item.size}
            </span>
          )}
          {item.color && (
            <span className="inline-flex items-center px-2.5 py-1 bg-white border border-stone-200 rounded-sm text-xs font-light text-stone-700">
              {item.color}
            </span>
          )}
        </div>
      </div>
      
      <div className="text-right flex-shrink-0">
        <p className="text-lg md:text-xl font-light text-stone-900">
          ₹{Number(item.price).toLocaleString()}
        </p>
        <p className="text-xs text-stone-500 mt-1 font-light">
          × {item.quantity}
        </p>
      </div>
    </motion.div>
  );
};

export default OrderItemCard;
