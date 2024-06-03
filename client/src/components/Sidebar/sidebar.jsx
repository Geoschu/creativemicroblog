import { Link } from "react-router-dom";
import Auth from "../../utils/auth";
import { useState, useEffect } from "react";
import logo from "../../assets/pixlit-logo3.svg";

const Sidebar = () => {
  const [isHeaderVisible, setHeaderVisible] = useState(true);

  useEffect(() => {
    const checkHeaderVisibility = () => {
      const header = document.querySelector(".custom-header");
      const headerRect = header.getBoundingClientRect();
      setHeaderVisible(headerRect.top >= 0);
    };

    window.addEventListener("scroll", checkHeaderVisibility);

    return () => {
      window.removeEventListener("scroll", checkHeaderVisibility);
    };
  }, []);

  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <div
      className={`sidebar flex flex-col justify-start items-center ${
        !isHeaderVisible ? "full-height" : ""
      }`}
    >
      <img
        src={logo}
        alt="Logo"
        style={{
          width: "75%",
          height: "auto",
          padding: "10px",
          display: isHeaderVisible ? "none" : "block",
        }}
      />
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
        </>
      )}
    </div>
  );
};

export default Sidebar;
