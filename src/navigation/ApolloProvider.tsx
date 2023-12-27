import React, { useContext } from 'react';
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  ApolloProvider,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import ENV from '../../env';
import { AuthContext } from './AuthNavigator';

const httpLink = createHttpLink({
  uri: ENV.API,
});

const ApolloProviderWithAuth = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { token } = useContext(AuthContext);

  const authLink = setContext((_, { headers }) => {
    console.log('tokenauthLink', token);
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ApolloProviderWithAuth;
