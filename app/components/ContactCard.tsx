import  { useEffect, useState } from "react";
import { BsArrowUpRight } from "react-icons/bs";
import axios from "axios";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "./ui/card";
import { AllProjectAPI } from "../lib/apiURL";

const ContactCard = () => {
  const [ProfileData, setProfileData] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getBio();
  }, []);

  const getBio = async () => {
    try {
      const response = await axios.post(AllProjectAPI.GetTableDetails, { tableKey: "Profile" });
      setProfileData(response.data.data[0].bio);
    } catch (error) {
      console.error("Error fetching bio:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="col-span-4 row-span-1  p-4 text-white border-none relative flex flex-col justify-between basecard_color_primary">
      {/* Arrow Icon - Positioned in the top-right */}
      <CardHeader className="absolute top-2 right-2">
        <BsArrowUpRight className="text-lg opacity-70 hover:opacity-100 transition-opacity" />
      </CardHeader>

      <CardContent className="flex-grow flex items-end p-3 pt-0">
        {isLoading ? (
          <div className="w-full h-6 bg-[#9A744D] rounded animate-pulse"></div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-base  text-gray-300 line-clamp-4 text-[#DCC1A6] "
          >
            {ProfileData}
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
};

export default ContactCard;
