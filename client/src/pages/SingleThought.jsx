import { Link } from "react-router-dom";

const ThoughtList = ({
  thoughts,
  title,
  showTitle = true,
  showUsername = true,
}) => {
  if (!thoughts.length) {
    return <h3>No Post Yet</h3>;
  }

  return (
    <div>
      {showTitle && <h3>{title}</h3>}
      {thoughts &&
        thoughts.map((thought) => (
          <div
            key={thought._id}
            className="card mb-3 bg-white rounded shadow-md border-green-500 border-2 flex flex-col justify-between"
          >
            <h4 className="card-header bg-primary text-light p-2 m-0">
              {showUsername ? (
                <div style={{ display: "flex", alignItems: "center" }}>
                  <img
                    src={thought.profPic}
                    //alt="/src/assets/userplaceholder.svg"
                    style={{
                      borderRadius: "50%",
                      width: "50px",
                      height: "50px",
                      objectFit: "cover",
                      marginRight: "10px",
                    }}
                  />
                  <div>
                    <Link
                      className="text-light"
                      to={`/profiles/${thought.thoughtAuthor}`}
                    >
                      {thought.thoughtAuthor} <br />
                      <span style={{ fontSize: "1rem" }}>
                        {thought.createdAt}
                      </span>
                    </Link>
                  </div>
                </div>
              ) : (
                <>
                  <span style={{ fontSize: "1rem" }}>
                    You made this post on {thought.createdAt}
                  </span>
                </>
              )}
            </h4>
            <div className="card-body bg-light p-2">
              <p>{thought.thoughtText}</p>
              <div>
                <img src={thought.url} height="200" />
              </div>
            </div>
            <div className="flex justify-end">
              <Link
                className="inline-block bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                to={`/thoughts/${thought._id}`}
              >
                reply
              </Link>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ThoughtList;
