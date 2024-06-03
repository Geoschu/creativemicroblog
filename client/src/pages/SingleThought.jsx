// Import the `useParams()` hook
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import CommentList from "../components/CommentList";
import CommentForm from "../components/CommentForm";

import { QUERY_SINGLE_THOUGHT } from "../utils/queries";

const SingleThought = () => {
  const { thoughtId } = useParams();

  const { loading, data } = useQuery(QUERY_SINGLE_THOUGHT, {
    variables: { thoughtId: thoughtId },
  });

  const thought = data?.thought || {};

  if (loading) {
    return <div className="text-center text-lg text-white-500">Loading...</div>;
  }
  return (

      <h3 className="card-header bg-dark text-light p-2 m-0">
        {thought.thoughtAuthor} <br />
        <img
        src={thought.profPic}
        alt="/src/assets/userplaceholder.svg"
        style={{
          borderRadius: "50%",
          width: "50px",
          height: "50px",
          objectFit: "cover",
          marginRight: "10px",
        }}
      />
        <span style={{ fontSize: "1rem" }}>
          had this thought on {thought.createdAt}
        </span>

    <div className="my-3 rounded shadow-md min-h-screen">
      <h3 className="text-center text-lg text-white-500 p-2 m-0">
        {thought.thoughtAuthor} <br />
        <span className="text-sm">{thought.createdAt}</span>

      </h3>
      <div className="bg-black py-4">
        <blockquote className="p-4 text-lg italic border-2 border-gray-300 leading-7">
          {thought.thoughtText}
        </blockquote>

        <img src={thought.url} className="block mx-auto h-screen"></img>

      </div>

      <div className="my-5">
        <CommentList comments={thought.comments} />
      </div>
      <div className="m-3 p-4 border-2 border-gray-300">
        <CommentForm thoughtId={thought._id} />
      </div>
    </div>
  );
};

export default SingleThought;
