import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client/core"
import { onError } from "@apollo/client/link/error"
import { logErrorMessages } from "@vue/apollo-util"

// Create an http link:
const httpLink = new HttpLink({
	uri: "https://rickandmortyapi.com/graphql"
})

const errorLink = onError((error) => {
	logErrorMessages(error)
})

// Create the apollo client
export const apolloClient = new ApolloClient({
	cache: new InMemoryCache(),
	link: errorLink.concat(httpLink),
})