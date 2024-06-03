import { Link } from "react-router-dom";
import Auth from "../../utils/auth";

const Sidebar = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <div className="sidebar flex flex-col">
      {Auth.loggedIn() ? (
        <>
          <Link className="btn btn-lg btn-info m-2" to="/me">
            <span className="text-white font-bold py-2 px-4 rounded bg--500 hover:bg-blue-700">
              {Auth.getProfile().data.username}'s profile
            </span>
          </Link>
          <button className="btn btn-lg btn-light m-2" onClick={logout}>
            <span className="text-black font-bold py-2 px-4 rounded bg-gray-300 hover:bg-gray-400">
              Logout
            </span>
          </button>
        </>
      ) : (
        <>
          <Link className="btn btn-lg btn-info m-2" to="/login">
            <span className="text-white font-bold py-2 px-4 rounded bg-green-500 hover:bg-blue-700">
              Login
            </span>
          </Link>
          <Link className="btn btn-lg btn-light m-2" to="/signup">
            <span className="text-black font-bold py-2 px-4 rounded bg-gray-300 hover:bg-gray-400">
              Signup
            </span>
          </Link>
        </>
      )}
    </div>
  );
};

export default Sidebar;
