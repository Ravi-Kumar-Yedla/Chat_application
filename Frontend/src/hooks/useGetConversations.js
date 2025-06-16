import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

const useGetConversations = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const getConversations = async () => {
      setLoading(true);
      try {
         const res = await fetch(`${API_URL}/api/users`, {
          method: 'GET',
          credentials: 'include', // ✅ Required to send cookies
        });
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Failed to fetch conversations");
        }
        setConversations(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    getConversations();
  }, []);

  return { loading, conversations };
};
export default useGetConversations;
