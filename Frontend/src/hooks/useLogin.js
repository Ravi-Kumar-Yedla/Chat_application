
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useAuthContext } from '../context/authContext';


 const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext()

    const login = async (username, password) => {
        if (!handleInputError(username, password)) return

        setLoading(true)
        try {
            const res = await fetch(`${API_URL}/api/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
                  credentials: "include" 
            })

            const data = await res.json()

            if (!res.ok) {
                // If response status is not OK (200-299)
                throw new Error(data.error || "Something went wrong with the login process.");
            }
            if (data.error) {
                throw new Error(data.error)
            }
            localStorage.setItem("chat-user", JSON.stringify(data))

            setAuthUser(data)
        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }
    return { loading, login }
}

export default useLogin

function handleInputError(username, password) {
    if (!username || !password) {
        toast.error("please fill in all fields");
        return false;
    }
    return true;
}
