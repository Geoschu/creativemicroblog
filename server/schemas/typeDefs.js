const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    password: String
    profPic: String
    thoughts: [Thought]!
    followers: [User]
  }

  type Thought {
    _id: ID
    thoughtText: String
    thoughtAuthor: String
    profPic: String
    url: String
    likes: Int!
    createdAt: String
    comments: [Comment]!
  }

  type Comment {
    _id: ID
    commentText: String
    commentAuthor: String
    createdAt: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    thoughts(username: String): [Thought]
    thought(thoughtId: ID!): Thought
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!, profPic: String!): Auth
    login(email: String!, password: String!): Auth
    addThought(thoughtText: String!, url: String!): Thought
    addComment(thoughtId: ID!, commentText: String!): Thought
    removeThought(thoughtId: ID!): Thought
    removeComment(thoughtId: ID!, commentId: ID!): Thought
    likeThought(thoughtId: ID!, userId: ID): Thought
    unlikeThought(thoughtId: ID!, userId: ID): Thought
    followUser(followerId: ID!, followedId: ID): User
    unfollowUser(followerId: ID!, followedId: ID): User
  }
`;

module.exports = typeDefs;
