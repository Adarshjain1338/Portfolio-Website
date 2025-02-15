import { motion } from "framer-motion";
import { Card } from "../ui/card";

const AnimatedCard = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <motion.div
      className={`overflow-hidden ${className}`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <Card className="p-4 border-none">{children}</Card>
    </motion.div>
  );
};

export default AnimatedCard;
