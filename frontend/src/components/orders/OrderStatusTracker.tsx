import { motion } from "framer-motion";

interface OrderStatusTrackerProps {
  status: "pending" | "accepted" | "rejected" | "completed" | "cancelled";
}

const OrderStatusTracker = ({ status }: OrderStatusTrackerProps) => {
  const getSteps = () => {
    if (status === "cancelled" || status === "rejected") {
      return [
        { label: "Order Placed", status: "completed", icon: "check" },
        { 
          label: status === "cancelled" ? "Cancelled" : "Rejected", 
          status: "error", 
          icon: "x" 
        },
      ];
    }

    const steps = [
      { label: "Order Placed", status: "completed", icon: "check" },
      { 
        label: "Processing", 
        status: status === "pending" ? "current" : "completed", 
        icon: "clock" 
      },
      { 
        label: "Shipped", 
        status: status === "accepted" 
          ? "current" 
          : status === "completed" 
          ? "completed" 
          : "pending", 
        icon: "truck" 
      },
      { 
        label: "Delivered", 
        status: status === "completed" ? "completed" : "pending", 
        icon: "check" 
      },
    ];

    return steps;
  };

  const steps = getSteps();

  const getStepColor = (stepStatus: string) => {
    switch (stepStatus) {
      case "completed":
        return {
          dot: "bg-stone-900 border-stone-900",
          text: "text-stone-900",
          icon: "text-white",
        };
      case "current":
        return {
          dot: "bg-amber-700 border-amber-700",
          text: "text-amber-800",
          icon: "text-white",
        };
      case "error":
        return {
          dot: "bg-red-600 border-red-600",
          text: "text-red-700",
          icon: "text-white",
        };
      default:
        return {
          dot: "bg-white border-stone-300",
          text: "text-stone-400",
          icon: "text-stone-400",
        };
    }
  };

  const getLineColor = (index: number) => {
    if (index >= steps.length - 1) return "";
    
    const currentStep = steps[index];
    const nextStep = steps[index + 1];
    
    if (currentStep.status === "completed" && (nextStep.status === "completed" || nextStep.status === "current")) {
      return "bg-stone-900";
    }
    return "bg-stone-200";
  };

  const getIcon = (icon: string) => {
    if (icon === "check") {
      return (
        <svg className="w-3 h-3 md:w-4 md:h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      );
    }
    if (icon === "clock") {
      return (
        <svg className="w-3 h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    }
    if (icon === "truck") {
      return (
        <svg className="w-3 h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
        </svg>
      );
    }
    if (icon === "x") {
      return (
        <svg className="w-3 h-3 md:w-4 md:h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      );
    }
  };

  return (
    <div className="relative py-4">
      <div className="flex items-start justify-between">
        {steps.map((step, index) => {
          const colors = getStepColor(step.status);
          
          return (
            <div key={index} className="flex-1 flex items-start relative">
              <div className="flex flex-col items-center w-full">
                {/* Step Dot */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ 
                    delay: index * 0.15, 
                    type: "spring", 
                    stiffness: 300 
                  }}
                  className={`w-8 h-8 md:w-10 md:h-10 rounded-full border-2 flex items-center justify-center ${colors.dot} relative z-10`}
                >
                  <span className={colors.icon}>
                    {getIcon(step.icon)}
                  </span>
                </motion.div>

                {/* Step Label */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.15 + 0.2 }}
                  className={`mt-3 text-xs md:text-sm font-light ${colors.text} text-center max-w-[90px] leading-tight`}
                >
                  {step.label}
                </motion.p>
              </div>

              {/* Connecting Line */}
              {index < steps.length - 1 && (
                <div className="absolute top-4 md:top-5 left-1/2 w-full h-0.5 -z-0">
                  <div className="h-full bg-stone-200 rounded-full">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ 
                        width: getLineColor(index) === "bg-stone-900" ? "100%" : "0%" 
                      }}
                      transition={{ 
                        delay: index * 0.15 + 0.4, 
                        duration: 0.5 
                      }}
                      className={`h-full rounded-full ${getLineColor(index)}`}
                    />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderStatusTracker;
