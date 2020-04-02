const express = require('express');
const secret = require('../config/keys.js').appSecret;
const mongoose = require('mongoose');
const Image = require('../models/Image');
const User = require('../models/User');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bodyParser =  require('body-parser');
const { typeDefs } = require('./schema');
const { resolvers } = require('./resolver');
const { graphqlExpress, graphiqlExpress} = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');

const app = express();

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,

}

app.use(cors(corsOptions))
//npm run server
const schema = makeExecutableSchema({
    typeDefs,
    resolvers
});

app.use(async (req, res, next) => {
    
    const token = req.headers['authorization'];
    if (token !== 'null') {
        try {
            const currentUser = await jwt.verify(token, secret);

            req.currentUser = currentUser;
        } catch(err) {
            
        }
    }
    
    next();
});

app.use('/graphiql', graphiqlExpress({
    endpointURL: '/graphql'
}));

app.use('/graphql', bodyParser.json(), graphqlExpress(({currentUser}) => ({ 
        schema,
        context: {
            Image,
            User,
            currentUser
        } 
    }))
);


const PORT = process.env.PORT || 4444;

const db = require('../config/keys.js').mongoURI;

mongoose.connect(db)
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));



app.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}`);
});