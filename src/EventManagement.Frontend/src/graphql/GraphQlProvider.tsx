import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

type Props = {
  children: React.ReactNode;
}

const GraphQlProvider = ({ children }: Props) => {
  return (
    <ApolloProvider client={client}>
      {children}
    </ApolloProvider>
  );
};

export default GraphQlProvider;
