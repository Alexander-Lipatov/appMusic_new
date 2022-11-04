import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

import React from 'react';
import { useEffect, useState } from 'react'
import * as NavigationBar from 'expo-navigation-bar';
import PlayerWidget from './components/PlayerWidget';
import axios from 'axios';
import Constants from "expo-constants";

import AsyncStorage from '@react-native-async-storage/async-storage'
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import { persistCache } from 'apollo3-cache-persist'

import { AppContext } from './AppContext';


const cache = new InMemoryCache()
const client = new ApolloClient({
  uri: 'http://lap1993.12.fvds.ru/graphql',
  cache,
  defaultOptions: { watchQuery: { fetchPolicy: 'cache-and-network' } },
})


export default function App() {
  const [songId, setSongId] = useState(null)

  const [loadingCache, setLoadingCache] = useState(true)
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  NavigationBar.setPositionAsync('absolute')
  NavigationBar.setBackgroundColorAsync('#ffffff00')

  useEffect(() => {
    persistCache({
      cache,
      storage: AsyncStorage,
    }).then(() => setLoadingCache(false))
  }, [])

  if (!isLoadingComplete) {
    return null;
  } else {

    return (
      <ApolloProvider client={client}>
        <SafeAreaProvider>
          <AppContext.Provider value={{
            songId,
            setSongId: (id: string) => setSongId(id),
          }}>
            <Navigation colorScheme={colorScheme} />
            <StatusBar />
            <PlayerWidget />
          </AppContext.Provider>
        </SafeAreaProvider>
      </ApolloProvider>
    );
  }
}
