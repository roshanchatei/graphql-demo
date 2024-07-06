import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {ApolloClient, InMemoryCache, ApolloProvider, ApolloLink, createHttpLink} from '@apollo/client';
import {timeDifference} from "./convertData";
import {setContext} from "@apollo/client/link/context";
import * as formatDateLink from "@apollo/client";

const httpLink =    createHttpLink({
    uri: "https://api.flexype.dev/dashboard/graphql"
});

const authLink = setContext((_, { headers }) => {
    return {
        headers: {
            ...headers,
            ...(!headers?.Authorization && {
                Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjZDMwYjU1NS1jM2ZjLTRlZjctOWU2Mi0wMTJiZmFmOGNiZTQiLCJwYXlsb2FkIjp7InBob25lIjo3Mjc4ODcyOTkwLCJ1c2VyX3R5cGUiOiJNRVJDSEFOVCIsIm1lcmNoYW50X2lkIjoiOTQ1ZDc2NDAtOGQ4YS00Yjc0LTlkZDAtNzdkMmY1NjA2YzMwIiwibWVyY2hhbnRfbmFtZSI6IkZsZXh5cGUgU3RvcmUifSwiaWF0IjoxNzIwMjUyMTE1LCJleHAiOjE3MjAzMzg1MTR9.pafT8OivcuddNxrLWpPXU3G8kyTiqg5izR6_wEQaqSA",
                'x-flexype-timezone': timeDifference()
            })
        }
    };
});


const client = new ApolloClient({
    connectToDevTools: true,
    link: ApolloLink.from([formatDateLink.concat(authLink.concat(httpLink))]),
    cache: new InMemoryCache(),
});


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <ApolloProvider client={client}>
          <App />
      </ApolloProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
