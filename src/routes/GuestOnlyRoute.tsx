import { Navigate } from "react-router-dom";
import useGetUser from "../hooks/useGetUser";
import type { JSX } from "react";

interface Props {
  children: JSX.Element;
}

const GuestOnlyRoute = ({ children }: Props) => {
  const user = useGetUser();

  if (user === undefined) return <div>Loading...</div>;

  if (user) return <Navigate to="/" replace />;

  return children;
};

export default GuestOnlyRoute;
