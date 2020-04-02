import React from 'react';
import { Query } from 'react-apollo';
import { GET_CURRENT_USER } from '../../queries'

const sessionWrapper = Component => props => {
    return (
        <Query query={GET_CURRENT_USER}>
            {({data, loading, refetch}) => {
                if (loading) {
                    return null;
                }
                return (
                    <Component {...props} refetch={refetch} session={data} />

                );
            }}
        </Query>
    );

};

export default sessionWrapper