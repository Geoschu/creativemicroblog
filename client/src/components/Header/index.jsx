import { Link } from "react-router-dom";

import Auth from "../../utils/auth";

import banner from "../../assets/pixlit-header3.svg";

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <header
      className="bg-primary text-light mb-4 py-3 flex-row align-center custom-header"
      style={{ display: "flex", justifyContent: "center" }}
    >
      {" "}
      <div className="container flex-row justify-space-between-lg justify-center align-center">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Link className="text-light" to="/">
            <img
              src={banner}
              alt="PixLit"
              style={{ width: "500px", height: "100px" }}
            />
          </Link>
        </div>
        {/* <div>
          {Auth.loggedIn() ? (
            <>
              <Link className="btn btn-lg btn-info m-2" to="/me">
                {Auth.getProfile().data.username}'s profile
              </Link>
              <button className="btn btn-lg btn-light m-2" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="btn btn-lg btn-info m-2" to="/login">
                Login
              </Link>
              <Link className="btn btn-lg btn-light m-2" to="/signup">
                Signup
              </Link>
            </>
          )}
        </div> */}
      </div>
    </header>
  );
};

export default Header;
