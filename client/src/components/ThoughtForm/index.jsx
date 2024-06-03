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
          profPic: Auth.getProfile().data.profPic,
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
    <div className="flex flex-col items-center justify-center">
      <h3 className="text-center text-lg text-gray-500">
        What would you like to Create?
      </h3>

      {Auth.loggedIn() ? (
        <>
          <p
            className={`m-0 ${
              characterCount === 280 || error ? "text-red-500" : ""
            }`}
          >
            Character Count: {characterCount}/280
          </p>
          <form
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline flex flex-col md:flex-row md:items-center"
            onSubmit={handleFormSubmit}
          >
            <div className="col-12 col-lg-9 flex-grow">
              <textarea
                name="thoughtText"
                placeholder="Here's a new thought..."
                value={thoughtText}
                className="form-input w-100"
                style={{ lineHeight: "1.5", resize: "vertical" }}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="flex flex-col md:flex-col md:justify-end md:items-end md:space-y-2">
              <div className="flex flex-col md:flex-row md:space-x-2">
                <Chunked setUrl={setUrl}>
                  <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full md:w-auto mb-2 md:mb-0"
                    type="button"
                  >
                    Choose Photo
                  </button>
                </Chunked>
                <button
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full md:w-auto mt-2 md:mt-0"
                  type="submit"
                >
                  Post
                </button>
              </div>
              {error && (
                <div className="my-3 p-3 bg-red-500 text-white">
                  {error.message}
                </div>
              )}
            </div>
          </form>
        </>
      ) : (
        <p>
          <Link to="/login">Login</Link> or <Link to="/signup">Signup</Link> to
          share your ideas.
        </p>
      )}
    </div>
  );
};




export default ThoughtForm;
