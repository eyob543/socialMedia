import { Outlet, NavLink, redirect } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import PlusIcon from "@mui/icons-material/AddAPhoto";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useUserStore } from "../functions/store";
import { FaRegUserCircle, FaSignOutAlt } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import handleSignInWithGoogle from "../functions/signInAction";
export default function Layout() {
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);
  const setIsLoggedIn = useUserStore((state) => state.setIsLoggedIn);
  const setUserName = useUserStore((state) => state.setUserName);
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setIsLoggedIn(true);
      setUserName(user.displayName);
    } else {
      setIsLoggedIn(false);
    }
  });

  function handleSignOut() {
    signOut(auth)
      .then(() => {
        redirect("/");
        setIsLoggedIn(false);
      })
      .catch((error) => {
        console.error(error.message);
      });
  }

  return (
    <div className="flex flex-col w-3/5 content-center items-center justify-center mx-auto gap-10">
      <div className="mt-10 md:mt-20  ">
        <Outlet />
      </div>
      <footer className="flex gap-16 fixed p-10 bottom-0 justify-center">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "bg-slate-600 rounded-lg p-1" : "underline"
          }
        >
          <HomeIcon sx={{ fontSize: "2rem" }} className="text-xl  text-white" />
        </NavLink>
        <NavLink
          to="post"
          className={({ isActive }) =>
            isActive ? "bg-slate-600 rounded-lg p-1" : "underline"
          }
        >
          <PlusIcon sx={{ fontSize: "2rem" }} className="text-xl text-white" />
        </NavLink>
        <NavLink
          to="user"
          className={({ isActive }) =>
            isActive ? "bg-slate-600 rounded-lg p-1" : "underline"
          }
        >
          <FaRegUserCircle className="w-8 h-8 text-white" />
        </NavLink>
        {!isLoggedIn ? (
          <button type="button" onClick={handleSignInWithGoogle}>
            <FcGoogle className="w-8 h-8 text-white" />
          </button>
        ) : (
          <button type="button" onClick={handleSignOut}>
            <FaSignOutAlt className="w-8 h-8 text-white" />
          </button>
        )}
      </footer>
    </div>
  );
}
