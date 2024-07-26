/* eslint-disable prettier/prettier */
import { useLoggedInfo } from "../functions/store";
import { Navigate, Outlet } from "react-router-dom";
export default function AuthRequired() {
  const isLoggedIn = useLoggedInfo();
  if (isLoggedIn) {
    return <Outlet />;
  }
  alert("Please sign in to post or to go into the users page");
  return <Navigate to="/" />;
}
