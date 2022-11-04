/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome, Entypo, EvilIcons, MaterialIcons, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { ColorSchemeName, Pressable } from 'react-native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';

import HomeScreen from '../screens/HomeScreen';
import TabTwoScreen from '../screens/SearchScreen';
import LibraryScreen from '../screens/LibraryScreen';
import ProfileScreen from '../screens/ProfileScreen';

import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import AlbumScreen from '../screens/AlbumScreen';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const StackNative = createStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <StackNative.Navigator>
      <StackNative.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />

      {/* <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} /> */}
      <StackNative.Group screenOptions={{ presentation: 'modal' }}>
        {/* <Stack.Screen name="Modal" component={ModalScreen} /> */}
      </StackNative.Group>



    </StackNative.Navigator>
  );
}


/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
        headerShown: false
      }}>
      <BottomTab.Screen
        name="Home"
        component={HomeNavigator}
        options={({ navigation }: RootTabScreenProps<'Home'>) => ({
          title: 'Home',
          tabBarIcon: ({ color }) => <Entypo name='home' size={30} style={{ marginBottom: -3 }} color={color} />,
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate('Modal')}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}>
              <FontAwesome
                name="info-circle"
                size={25}
                color={Colors[colorScheme].text}
                style={{ marginRight: 15 }}
              />
            </Pressable>
          ),
        })}
      />
      <BottomTab.Screen
        name="Search"
        component={TabTwoScreen}
        options={{
          title: 'Поиск',
          tabBarIcon: ({ color }) => <EvilIcons name='search' color={color} size={40} style={{ marginBottom: -3 }} />,
        }}
      />
      <BottomTab.Screen
        name="Library"
        component={LibraryScreen}
        options={{
          title: 'Библиотека',
          tabBarIcon: ({ color }) => <MaterialIcons name="my-library-music" color={color} size={30} style={{ marginBottom: -3 }} />,
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'Профиль',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name='account-box-outline' color={color} size={30} style={{ marginBottom: -3 }} />,
        }}
      />

    </BottomTab.Navigator>
  );
}

const HomeStack = createStackNavigator();


function HomeNavigator() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="TabOneScreen"
        component={HomeScreen}
        options={{ headerTitle: 'Spotify', headerTitleAlign: 'center' }}
      />
      <HomeStack.Screen
        name="AlbumScreen"
        component={AlbumScreen}
        options={{ headerTitle: 'Home' }}
      />


    </HomeStack.Navigator>
  );
}

