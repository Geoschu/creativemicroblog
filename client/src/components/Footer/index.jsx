import { useLocation, useNavigate } from "react-router-dom";

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <footer className="w-100 mt-auto bg-secondary p-4 footer">
      <div className="container text-center mb-5">
        {location.pathname !== "/" && (
          <button className="btn btn-dark mb-3" onClick={() => navigate(-1)}>
            &larr; Go Back
          </button>
        )}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <h4>
            Made with{" "}
            <span
              className="emoji"
              role="img"
              aria-label="heart"
              aria-hidden="false"
            >
              ❤️
            </span>{" "}
            by Three small children in a trenchcoat. © 2024
          </h4>
          <img
            src="/src/assets/threekidslogo.svg"
            alt="Three small children in a trenchcoat"
            width="40"
            height="40"
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
