import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

import React from 'react';
import * as NavigationBar from 'expo-navigation-bar';
import PlayerWidget from './components/PlayerWidget';
import axios from 'axios';
import Constants from "expo-constants";

export default function App() {

  // enables edge-to-edge mode
  NavigationBar.setPositionAsync('absolute')
  // transparent backgrounds to see through
  NavigationBar.setBackgroundColorAsync('#ffffff00')

  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  if (!isLoadingComplete) {
    return null;
  } else {




    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
        <PlayerWidget />
      </SafeAreaProvider>
    );
  }
}
