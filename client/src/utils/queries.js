import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      thoughts {
        _id
        thoughtText
        createdAt
      }
    }
  }
`;

export const QUERY_THOUGHTS = gql`
  query getThoughts {
    thoughts {
      _id
      thoughtText
      thoughtAuthor
      createdAt
    }
  }
`;

export const QUERY_SINGLE_THOUGHT = gql`
  query getSingleThought($thoughtId: ID!) {
    thought(thoughtId: $thoughtId) {
      _id
      thoughtText
      thoughtAuthor
      createdAt
      comments {
        _id
        commentText
        commentAuthor
        createdAt
      }
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      thoughts {
        _id
        thoughtText
        thoughtAuthor
        createdAt
      }
    }
  }
`;

//import { gql, useMutation } from '@apollo/client';

const LIKE_POST = gql`
  mutation LikePost($postId: ID!, $userId: ID!) {
    likePost(postId: $postId, userId: $userId) {
      id
      likes
    }
  }
`;

const DELETE_LIKE = gql`
  mutation DeleteLike($postId: ID!, $userId: ID!) {
    unlikePost(postId: $postId, userId: $userId) {
      id
      likes
    }
  }
`;

// function Like({ postId }) {
//   const [likePost] = useMutation(LIKE_POST);
//   const [unlikePost] = useMutation(DELETE_LIKE);

//   const handleClick = async () => {
//     // Check if the current user has already liked the post
//     // Perform the like or unlike operation based on the current state
//     const result = await likePost({ variables: { postId, userId: "currentUserId" } });
//     // Update local state or UI accordingly
//   };

//   return <button onClick={handleClick}>Like</button>;
// }
