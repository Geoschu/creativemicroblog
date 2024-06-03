import { useQuery } from "@apollo/client";

import ThoughtList from "../components/ThoughtList";
import ThoughtForm from "../components/ThoughtForm";

import { QUERY_THOUGHTS } from "../utils/queries";

import { useState, useEffect } from "react";

const Home = () => {
  const { loading, data } = useQuery(QUERY_THOUGHTS);
  const thoughts = data?.thoughts || [];
  const [isCustomHeaderVisible, setCustomHeaderVisible] = useState(true);

  useEffect(() => {
    const checkHeaderVisibility = () => {
      const header = document.querySelector(".custom-header");
      const headerRect = header.getBoundingClientRect();
      setCustomHeaderVisible(headerRect.top >= 0);
    };

    window.addEventListener("scroll", checkHeaderVisibility);

    return () => {
      window.removeEventListener("scroll", checkHeaderVisibility);
    };
  }, []);
  // bg-gradient-to-r from-green-400 to-blue-500
  return (
    <main className="rounded shadow-md min-h-screen">
      <div className="flex flex-col items-center justify-center">
        <div className="w-full md:w-3/4 lg:w-1/2 p-4 my-4 bg-white rounded shadow-md border-green-500 border-2">
          <ThoughtForm />
        </div>
        <div className="w-full md:w-3/4 lg:w-1/2 p-4 my-4 bg-green rounded shadow-md">
          {loading ? (
            <div className="text-center text-lg text-gray-500">Loading...</div>
          ) : (
            <div className="text-center text-white">
              <ThoughtList thoughts={thoughts} title="Find your inspiration" />
            </div>
          )}
        </div>
      </div>
      {/* {isCustomHeaderVisible ? null : (
        <header
          className="text-white bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 p-5 text-center fixed bottom-0 w-full"
          style={{
            justifyContent: "center",
            zIndex: 2,
          }}
        >
          <h1 className="text-4xl font-bold tracking-wide">
            welcome to PixLit
          </h1>
          <p className="mt-2 text-xl"> Find your inspiration here</p>
        </header>
      )} */}
    </main>
  );
};

export default Home;
