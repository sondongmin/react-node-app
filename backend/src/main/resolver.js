const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const secret = require('../config/keys.js').appSecret;

const createToken = (user, secret, expiresIn) => {
    const {username, email } = user;
    return jwt.sign({username, email}, secret, {expiresIn})
}

exports.resolvers = {
    Query: {
        getAllImages: async (root, args, {Image}) => {
            const allImages = await Image.find().sort({createdAt: 'desc'});
            return allImages;
            
        },
        getImage: async (root, {_id }, {Image}) => {
            const image = await Image.findOne({ _id });
            return image;
        },
        searchImages: async (root, { searchTerm }, { Image }) => {
            if (searchTerm) {
                const searchResults = await Image.find({
                    $text: { $search: searchTerm }
                }, {
                    score: {$meta: "textScore" }
                }).sort({
                    score: {$meta: "textScore" }
                });
                return searchResults;
            } else {
                const images = await Image.find().sort({ likes: 'desc', createdAt: 'desc'});
                return images;
            }
        },
        getUserImages: async (root, {username}, {Image}) => {
            const userImages = await Image.find({username}).sort({
                createdAt: 'desc'
            });
            return userImages;
        },
        getCurrentUser: async (root, args, { currentUser, User }) => {
            if (!currentUser) {
              return null;
            }
            const user = await User.findOne({
              username: currentUser.username
            }).populate({
              path: "favorites",
              model: "Image"
            });
            return user;
          }
    },
    Mutation: {
        addImage: async (root, { name, category, description, username, image}, { Image }) => {
            const newImage = await new Image({
                name,
                category,
                description,
                username,
                image
            }).save();

            return newImage;
        },
        likeImage: async (root, {_id, username}, {Image, User}) => {
            const image = await Image.findOneAndUpdate({ _id }, { $inc: { likes: 1}});
            const user = await User.findOneAndUpdate({ username }, { $addToSet: {
                favorites: _id
            }});
            return image;

        },
        unlikeImage: async (root, {_id, username}, {Image, User}) => {
            const image = await Image.findOneAndUpdate({ _id }, { $inc: { likes: -1}});
            const user = await User.findOneAndUpdate({ username }, { $pull: {
                favorites: _id
            }});
            return image;

        },
        deleteUserImage: async (root, { _id }, { Image }) => {
            const image = await Image.findOneAndRemove({ _id });
            return image;
        },
        updateUserImage: async (root, { _id, name, category, description, image}, {Image}) => {
            const updatedImage = await Image.findOneAndUpdate(
                {_id },
                {$set: {name, category, description, image}},
                {new: true }
            );
            return updatedImage;
        },
        signInUser: async (root, {username, password}, {User}) => {
            const user = await User.findOne({username});
            if (!user) {
                throw new Error('User not found');
            }
            const isValidPassword = bcrypt.compare(password, user.password);
            if(!isValidPassword) {
                throw new Error('Invalid password');
            }
            return { token: createToken(user, secret, "1hr" )}
        },
        signUpUser: async(root, {username, email, password}, {User}) => {
            const user = await User.findOne({username});

            if (user) {
                throw new Error('User already exists');
            }
            const newUser = await new User({
                username,
                email,
                password
            }).save();
            
            return { token: createToken(newUser, secret, "1hr" )}
        }

    } 

};