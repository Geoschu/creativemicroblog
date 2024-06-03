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
