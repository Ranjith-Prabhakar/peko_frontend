import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { logoutApi } from "../../services/auth/logout";
import { logout } from "../../store/features/auth/authSlice";
import { disconnectSocket } from "../../socket/socket";
import { clearNotifications } from "../../store/features/notification/notificationSlice";

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const performLogout = async () => {
      try {
        await logoutApi();
      } catch (error) {
        console.error("Logout API failed", error);
      } finally {
        dispatch(logout());
        dispatch(clearNotifications());
        disconnectSocket();

        navigate("/login", { replace: true });
      }
    };

    performLogout();
  }, [dispatch, navigate]);

  return null;
};

export default Logout;
