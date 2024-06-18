import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

import { logout } from "../../redux/userReducer.js";
import { persistor } from "../../redux/store.js";
import "./UserMenu.scss";

function UserMenu() {
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();
  function handleLogout() {
    dispatch(logout());
    persistor.purge();

    setTimeout(() => {
      toast.success("Logged out successfully");
    }, 1000);
  }

  return (
    <div className="user-menu">
      {user.currentUser === null ? (
        <>
          <Link className="link menu-link" to="/login">
            Login
          </Link>
          <Link className="link menu-link" to="/register">
            Register
          </Link>
        </>
      ) : (
        <>
          <p className="name">Hi {user.currentUser.fullname.split(" ")[0]},</p>
          <Link className="link menu-link" to="/user">
            View Profile
          </Link>
          <button className="link menu-link" onClick={handleLogout}>
            Logout
          </button>
        </>
      )}
    </div>
  );
}

export default UserMenu;
