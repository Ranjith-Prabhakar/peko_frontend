import axios from "../../api/axiosInstance";

export const logoutApi = async () => {
    try {
         return axios.get("/auth/logout", {
               withCredentials: true,
               requiresAuth: true
             }); 
    } catch (error) {
        console.error("Logout failed:", error);
    }

};
