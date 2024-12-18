import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { authHeader } from "../utils/auth-header";

const httpLink = createHttpLink({
    uri: `${process.env.REACT_APP_GRAPHQL_URL}`
});

const authLink = setContext((_) => {
    return {
        headers: authHeader()
    };
});

export const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
});
