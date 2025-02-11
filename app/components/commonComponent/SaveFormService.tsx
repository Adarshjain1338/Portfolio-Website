import axios from "axios";
import toast from "react-hot-toast";

export async function saveFormData(apiUrl: string, data: any, refreshData: () => void) {
  try {
    const response = await axios.post(apiUrl, { data });
    if (response.status === 200) {
      toast.success("Data Saved Successfully");
      refreshData();
    } else {
      toast.error("Data Save Failed");
    }
  } catch (error) {
    console.error("Error saving data:", error);
    toast.error("Data Save Failed");
  }
}
