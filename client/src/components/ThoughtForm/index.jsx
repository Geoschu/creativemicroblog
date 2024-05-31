import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";

import { ADD_THOUGHT } from "../../utils/mutations";
import { QUERY_THOUGHTS, QUERY_ME } from "../../utils/queries";
import Chunked from "../../utils/imageUpload";
import Auth from "../../utils/auth";



const ThoughtForm = () => {
  const [thoughtText, setThoughtText] = useState("");
  const [url, setUrl] = useState("");
  const [characterCount, setCharacterCount] = useState(0);
  // something like set media and mediaState for form submit
  const [addThought, { error }] = useMutation(ADD_THOUGHT, {
    refetchQueries: [QUERY_THOUGHTS, "getThoughts", QUERY_ME, "me"],
  });
  // console.log(url);
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(url);
    try {
      const { data } = await addThought({
        variables: {
          thoughtText,
          thoughtAuthor: Auth.getProfile().data.username,
          url,
        },
      });

      setThoughtText("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "thoughtText" && value.length <= 280) {
      setThoughtText(value);
      setCharacterCount(value.length);
    }
  };
  // this is where we will need to update react to handle url images within the upload and posting proccess... (daniel)
  return (
    <div>
      <h3>What's on your mind?</h3>

      {Auth.loggedIn() ? (
        <>
          <p
            className={`m-0 ${
              characterCount === 280 || error ? "text-danger" : ""
            }`}
          >
            Character Count: {characterCount}/280
          </p>
          <form
            className="flex-row justify-center justify-space-between-md align-center"
            onSubmit={handleFormSubmit}
          >
            <div className="col-12 col-lg-9">
              <textarea
                name="thoughtText"
                placeholder="Here's a new thought..."
                value={thoughtText}
                className="form-input w-100"
                style={{ lineHeight: "1.5", resize: "vertical" }}
                onChange={handleChange}
              ></textarea>
            </div>

            <Chunked
            setUrl={setUrl}
            > </Chunked>

            <div className="col-12 col-lg-3">
              <button className="btn btn-primary btn-block py-3" type="submit">
                Add Thought
              </button>
            </div>
            {error && (
              <div className="col-12 my-3 bg-danger text-white p-3">
                {error.message}
              </div>
            )}
          </form>
        </>
      ) : (
        <p>
          You need to be logged in to share your thoughts. Please{" "}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

const FOLLOW_USER = gql`
  mutation FollowUser($id: ID!) {
    followUser(id: $id) {
      id
      name
      email
      followers
    }
  }
`;

const UNFOLLOW_USER = gql`
  mutation UnfollowUser($id: ID!) {
    unfollowUser(id: $id) {
      id
      name
      email
      followers
    }
  }
`;

function UserProfile({ userId }) {
  const [followUser] = useMutation(FOLLOW_USER);
  const [unfollowUser] = useMutation(UNFOLLOW_USER);

  const handleFollow = async () => {
    try {
      const { data } = await followUser({ variables: { id: userId } });
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUnfollow = async () => {
    try {
      const { data } = await unfollowUser({ variables: { id: userId } });
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {/* Render user profile */}
      <button onClick={handleFollow}>Follow</button>
      <button onClick={handleUnfollow}>Unfollow</button>
    </div>
  );
}


export default ThoughtForm;
