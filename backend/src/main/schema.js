exports.typeDefs =  `

type Image {
    _id: ID
    name: String!
    category: String
    description: String
    createdAt: String
    likes: Int
    username: String
    image: String
}

type User {
    _id: ID
    username: String! @unique
    password: String!
    email: String!
    createdAt: String
    favorites: [Image]
}

type Query {
    getAllImages: [Image]
    getImage(_id: ID!): Image
    searchImages(searchTerm: String!): [Image]
    getUserImages(username: String!): [Image]
    getCurrentUser: User
    
}

type Token {
    token: String!
}

type Mutation {
    addImage(name: String!, category: String, description: String, username: String, image: String): Image
    signInUser(username: String!, password: String!): Token
    deleteUserImage(_id: ID): Image
    updateUserImage(_id: ID!, name: String!, category: String, description: String, username: String, image: String): Image
    likeImage(_id: ID!, username: String!): Image
    unlikeImage(_id: ID!, username: String!): Image
    signUpUser(username: String!, email: String!, password: String!): Token
}

`;