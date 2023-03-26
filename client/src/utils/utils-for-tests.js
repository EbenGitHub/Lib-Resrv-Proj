import React from "react";
import { render } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import authenticationReducer from "../reducers/authenticationReducer";
import notificationReducer from "../reducers/notificationReducer";
import tourguidReducer from "../reducers/tourguidReducer";
import { BrowserRouter } from "react-router-dom";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({cache: new InMemoryCache()})

export function renderWithProviders(
  ui,
  {
    preloadedState = {},
    store = configureStore({
      reducer: { 
        authentication: authenticationReducer,
        notification: notificationReducer,
        tourguid: tourguidReducer
     },
      preloadedState,
    }),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return <BrowserRouter>
                <ApolloProvider client={client}>
                    <Provider store={store}>
                        {children}
                    </Provider>
                </ApolloProvider>
            </BrowserRouter>;
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}

export function renderAuthUserWithProviders(
  ui,
  {
    preloadedState = {
      authentication: 'token', 
      notification: [
        {title: "this is test Notification", status: "success", id: '1'}
    ]
  },
    store = configureStore({
      reducer: { 
        authentication: authenticationReducer,
        notification: notificationReducer,
        tourguid: tourguidReducer
     },
      preloadedState,
    }),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return <BrowserRouter>
                <ApolloProvider client={client}>
                    <Provider store={store}>
                        {children}
                    </Provider>
                </ApolloProvider>
            </BrowserRouter>;
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}

export const books = [
    {
        id: 1,
        title: 'Jest is fun',
        available: true,
        expired: null,
        reserved: false,
        author: 'Eben',
        reservationHistory: []
    },
    {
        id: 2,
        title: 'Test anything',
        available: false,
        expired: {
            isExpired: false,
            expiryDate: 'Sun Mar 26 2023 12:19:08 GMT+0300 (East Africa Time)',
            timeFormate: 'Days'
        },
        reserved: true,
        author: 'Beni',
        reservationHistory: [
            "you reserved this book yesterday"
        ]
    },
]