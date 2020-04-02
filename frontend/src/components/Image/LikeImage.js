import React, { useState, useEffect } from 'react';
import { LIKE_IMAGE, UNLIKE_IMAGE, GET_IMAGE } from '../../queries';
import { Mutation } from 'react-apollo';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import sessionWrapper from '../Auth/SessionWrapper';

const LikeImage = (props) => {
    const { _id } = props;
    let [username, setUsername] = useState('');
    let [prevLiked, setPrevLiked] = useState(false);
    useEffect(() => {
        if (props.session && props.session.getCurrentUser) {
            const { favorites } = props.session.getCurrentUser;
            const prevLiked = favorites.findIndex(favorite => favorite._id === _id) !== -1;

            setUsername(props.session.getCurrentUser.username);

            setPrevLiked(prevLiked);
        }
    }, [_id, props.session]);

    const handleClick = (likeImage, unlikeImage) => {
        setPrevLiked(!prevLiked);
        handleLike(likeImage, unlikeImage);
    }

    const handleLike = (likeImage, unlikeImage) => {
        if (prevLiked) {
            likeImage().then(async ({data}) => {
                await props.refetch();
            });
        } else {
            unlikeImage().then(async ({data}) => {
                await props.refetch();
            });
        }
        
    }

    const updateLike = (cache, {data: {likeImage}} ) => {
        const { _id } = props; 
        const { getImage } = cache.readQuery({query: GET_IMAGE, variables: { _id }});


        cache.writeQuery({
            query: GET_IMAGE,
            variables: { _id },
            data: {
                getImage: {...getImage, likes: likeImage.likes + 1}
            }
        });
    }

    const updateUnlike = (cache, {data: {unlikeImage}} ) => {
        const { _id } = props; 
        const { getImage } = cache.readQuery({query: GET_IMAGE, variables: { _id }});


        cache.writeQuery({
            query: GET_IMAGE,
            variables: { _id },
            data: {
                getImage: {...getImage, likes: unlikeImage.likes - 1}
            }
        });
    }

    return (
        <div>
        <Mutation mutation={UNLIKE_IMAGE} variables={{_id, username}} update={updateUnlike}>
        {unlikeImage => {
            return (
                <Mutation mutation={LIKE_IMAGE} variables={{_id, username}} update={updateLike}>
                {likeImage => {
                    if(username !== '') {
                        return (
                            prevLiked ? 
                            <h4><ThumbDownIcon onClick={() => handleClick(likeImage, unlikeImage)}/></h4> :
                            <h4><ThumbUpIcon onClick={() => handleClick(unlikeImage, likeImage)}/></h4> 
                            
                        );
                    } else {
                        return false;
                    }
                    
                }}
                </Mutation>
            );
        }}
        
        </Mutation>
        </div>
    );
};


export default sessionWrapper(LikeImage);