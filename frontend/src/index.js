import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import App from './App';

import Navbar from './components/Navbar';
import SignUp from './components/Auth/SignUp';
import SignIn from './components/Auth/SignIn';
import Search from './components/Image/Search'
import Create from './components/Image/Create';
import Details from './components/Image/Details';
import Profile from './components/Profile/Profile';

import sessionWrapper from './components/Auth/SessionWrapper';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

const client = new ApolloClient({
    uri: "http://localhost:4444/graphql",
    fetchOptions: {
        credentials: 'include'
    },
    request: operation => {
        const token = localStorage.getItem('token');

        operation.setContext({
            headers: {
                authorization: token
            }
        })
    },
    onError: ({networkError}) => {
        if (networkError) {
            localStorage.setItem('token', '');
            console.log('Network Error', networkError);
        }
    }
});

const Root = ({refetch, session}) => (
    <Router>
        <Navbar session={session}/>
        <Switch>
            <Route path="/" exact component={App} />
            <Route path="/search" exact component={Search} />

            <Route path="/signin" render={() => <SignIn refetch={refetch} /> } />} />
            <Route path="/signup" render={() => <SignUp refetch={refetch} /> } />} />
            <Route path="/image/create" render={() => <Create session={session} /> } /> } />
            <Route path="/image/:_id" component={Details} />
            <Route path="/profile" render={() => <Profile session={session} /> } /> } />
            <Redirect to="/" />
        </Switch>
    </Router>
);

const Wrapper = sessionWrapper(Root)(Root.props);

ReactDOM.render(
    <ApolloProvider client={client}>{Wrapper}</ApolloProvider>, 
document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
