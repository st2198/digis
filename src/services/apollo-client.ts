"use client";

import { ApolloLink } from "@apollo/client";
import { HttpLink } from "@apollo/client";
import {
  NextSSRApolloClient,
  NextSSRInMemoryCache,
  SSRMultipartLink,
} from "@apollo/experimental-nextjs-app-support/ssr";

export function makeClient() {
  // const httpLink = new HttpLink({
  //   uri: "https://www.toiletmap.org.uk/api",
  // });

  const httpLink = new HttpLink({
    uri: "https://rickandmortyapi.com/graphql",
  });

  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache(),
    link:
      typeof window === "undefined"
        ? ApolloLink.from([
          new SSRMultipartLink({
            stripDefer: true,
          }),
          httpLink,
        ])
        : httpLink,
  });
}
