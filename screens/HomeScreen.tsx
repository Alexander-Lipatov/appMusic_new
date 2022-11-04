import React from 'react';

import { StyleSheet, View, FlatList, AppRegistry } from 'react-native';

import { RootTabScreenProps } from '../types';

import AlbumCategory from '../components/AlbumCategory';

import albumCategory from '../data/albumCategories'


import { useQuery, gql } from '@apollo/client';


const CHAPTERS_QUERY = gql`
  query getAlbumCategory {
    albumCategories {
    id
    title
    albums{
      id
      imageUri
      artist
      songs{
        id
        title
        artist
        imageUri
        uri
      }
    }
  }
}
`

// const CHAPTERS_QUERY = gql`
//   query Chapters {
//     chapters {
//       id
//       number
//       title
//     }
//   }
// `


export default function HomeScreen({ navigation }: RootTabScreenProps<'Home'>) {
  const { data, loading } = useQuery(CHAPTERS_QUERY)
  return (
    <View style={styles.container}>


      <FlatList
        data={data.albumCategories}
        renderItem={({ item }) => <AlbumCategory title={item.title} albums={item.albums} />}
        keyExtractor={(item) => item.id}
      />


    </View>
  );
}

const styles = StyleSheet.create({
  container: {

    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
