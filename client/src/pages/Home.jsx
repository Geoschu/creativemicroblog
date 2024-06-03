import { useQuery } from "@apollo/client";

import ThoughtList from "../components/ThoughtList";
import ThoughtForm from "../components/ThoughtForm";

import { QUERY_THOUGHTS } from "../utils/queries";
import { QUERY_USER } from "../utils/queries";
const Home = () => {
  const { loading, data } = useQuery(QUERY_THOUGHTS, QUERY_USER);
  const thoughts = data?.thoughts || [];
  const users = data?.users || [];
  return (
    <main className="bg-gradient-to-r from-green-400 to-blue-500 min-h-screen">
      <div className="flex flex-col items-center justify-center">
        <div className="w-full md:w-3/4 lg:w-1/2 p-4 my-4 bg-white rounded shadow-md border-green-500 border-2">
          <ThoughtForm />
        </div>
        <div className="w-full md:w-3/4 lg:w-1/2 p-4 my-4 bg-white rounded shadow-md">
          {loading ? (
            <div className="text-center text-lg text-gray-500">Loading...</div>
          ) : (
            <ThoughtList thoughts={thoughts} users={users} title="Find inspiration" />
          )}
        </div>
      </div>
      <header className="text-white bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 p-5 text-center">
        <h1 className="text-4xl font-bold tracking-wide">Welcome to PixLit</h1>
        <p className="mt-2 text-xl">Find your inspiration here</p>
      </header>
    </main>
  );
};

export default Home;
