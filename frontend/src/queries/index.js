import { gql } from 'apollo-boost';
import { imageFragments } from './fragments'
export const GET_ALL_IMAGES = gql`
query {
    getAllImages {
        _id
        name
        category
        description
        createdAt
        likes
        image
    }
}`

export const GET_IMAGE = gql`
query ($_id: ID!) {
    getImage(_id: $_id) {
        ...CompleteImage
    }
}
${imageFragments.image}
`

export const GET_CURRENT_USER = gql`
query {
    getCurrentUser {
        username,
        createdAt,
        email
        favorites {
            _id
            name
            category
            description
            createdAt
            likes
            image
        }
    }
}`

export const GET_USER_IMAGES = gql`
query($username: String!) {
    getUserImages(username: $username) {
        ...CompleteImage
    }
}
${imageFragments.image}
`

export const SEARCH_IMAGES = gql`
query($searchTerm: String!) {
    searchImages(searchTerm: $searchTerm) {
        _id
        name
        likes
    }
}`

export const ADD_IMAGE = gql`
mutation($name: String!, $category: String!, $description: String!, $username: String!, $image: String!) {
    addImage(name: $name, category: $category, description: $description, username: $username, image: $image) {
        ...CompleteImage
    }
}
${imageFragments.image}
`

export const LIKE_IMAGE = gql`
mutation($_id: ID!, $username: String!) {
    likeImage(_id: $_id, username: $username) {
        ...LikeImage
    }
}
${imageFragments.like}
`
export const UNLIKE_IMAGE = gql`
mutation($_id: ID!, $username: String!) {
    unlikeImage(_id: $_id, username: $username) {
        ...LikeImage
    }
}
${imageFragments.like}
`

export const UPDATE_USER_IMAGE = gql`
mutation($_id: ID!, $name: String!, $category: String!, $description: String!, $image: String!) {
    updateUserImage(_id: $_id, name: $name, category: $category, description: $description, image: $image) {
        ...CompleteImage
    }
    
}
${imageFragments.image}
`

export const DELETE_USER_IMAGE = gql`
mutation($_id: ID!) {
    deleteUserImage(_id: $_id) {
        _id
    }
    
}`

export const SIGN_UP_USER = gql`
mutation($username: String!, $email: String!, $password: String!) {
    signUpUser(username: $username, email: $email, password: $password) {
        token
    }
}`

export const SIGN_IN_USER = gql`
mutation($username: String!, $password: String!) {
    signInUser(username: $username, password: $password) {
        token
    }
}`
