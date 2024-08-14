import { FaRegUserCircle } from "react-icons/fa";
import { useUserName } from "../functions/store";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { auth } from "../functions/firebase";
import { Outlet, NavLink } from "react-router-dom";
export default function User() {
  const userName = useUserName();
  const profilePhoto = auth.currentUser.photoURL;

  return (
    <div className="flex flex-col gap-4 items-center">
      {profilePhoto ? (
        <img src={profilePhoto} className=" rounded-full" alt="User profile" />
      ) : (
        <FaRegUserCircle className="w-16 h-16" />
      )}
      <Typography>{userName}</Typography>
      <Box
        sx={{
          display: "flex",
          gap: 4,
          justifyContent: "center",
        }}
      >
        <NavLink
          to="followers"
          className={({ isActive }) =>
            isActive ? "p-1 text-lg font-semibold" : "p-2"
          }
        >
          Followers
        </NavLink>
        <NavLink
          to="following"
          className={({ isActive }) =>
            isActive ? "p-1 text-lg font-semibold" : "p-2"
          }
        >
          Following
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? " p-1 text-lg font-semibold" : "p-2"
          }
        >
          Posts
        </NavLink>
      </Box>
      <Outlet />
    </div>
  );
}
