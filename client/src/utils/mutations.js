import { gql } from '@apollo/client';
// update this file to handle new media entries once we hook up cloudinary (daniel)
export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;
// this is what we need to update to store the images with a post but we also need the ability to leave it blank in case no one wants to add a photo...
export const ADD_THOUGHT = gql`
  mutation addThought($thoughtText: String!) {
    addThought(thoughtText: $thoughtText) {
      _id
      thoughtText
      thoughtAuthor
      createdAt
      file
      comments {
        _id
        commentText
      }
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($thoughtId: ID!, $commentText: String!) {
    addComment(thoughtId: $thoughtId, commentText: $commentText) {
      _id
      thoughtText
      thoughtAuthor
      createdAt
      comments {
        _id
        commentText
        createdAt
      }
    }
  }
`;

import { useMutation, gql } from '@apollo/client';

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

