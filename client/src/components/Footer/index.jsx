import { useLocation, useNavigate } from "react-router-dom";

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <footer className="w-full mt-auto bg-secondary p-4">
      <div className="container text-center mb-5">
        {location.pathname !== "/" && (
          <button className="btn btn-dark mb-3" onClick={() => navigate(-1)}>
            &larr; Go Back
          </button>
        )}
        <div className="flex justify-center">
          <header className="text-white bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 p-1 text-center fixed bottom-0 w-full z-10">
            <div className="flex flex-col items-center">
              <h1 className="text-3xl font-bold tracking-wide">
                welcome to PixLit
                <span className="ml-2 text-xl">Find your inspiration here</span>
              </h1>
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
            </div>
            <img
              src="/src/assets/threekidslogo.svg"
              alt="Three small children in a trenchcoat"
              width="40"
              height="40"
              className="ml-2" // Add some space between the text and the image
            />
          </header>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
