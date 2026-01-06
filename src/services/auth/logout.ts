import axios from "../../api/axiosInstance";

export const logoutApi = async () => {
    try {
         return axios.get("/logout", {
               withCredentials: true,
             }); 
    } catch (error) {
        console.error("Logout failed:", error);
    }

};
