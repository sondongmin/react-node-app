import { gql } from 'apollo-boost';

export const imageFragments = {
    image: gql`
        fragment CompleteImage on Image {
            _id
            name
            category
            description
            createdAt
            likes
            username
            image
        }
    `,
    like: gql`
    fragment LikeImage on Image {
        _id
        likes
    }
`,
}