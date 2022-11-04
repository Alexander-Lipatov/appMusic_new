import { View, Text, FlatList } from 'react-native'
import React, { useEffect } from 'react'
import { useRoute } from '@react-navigation/native'

import SongListItem from '../components/SongListItem'
import AlbumHeader from '../components/AlbumHeader'
import albumDetails from '../data/albumDetaild'

import { useQuery, gql } from '@apollo/client';


const SECTIONS_QUERY = gql`
  query getSong($id: Int!) {
    album(id: $id){
      id
      name
      by
      likes
      imageUrl
      artist
      songs{
        id
        imageUrl
        artist
        uri
        title
      }
    }
  }
`

// const SECTIONS_QUERY = gql`
//   query Sections($id: Int!) {
//     chapter(id: $id) {
//       sections {
//         number
//         title
//       }
//     }
//   }
// `



const AlbumScreen = ({ route }) => {
  const { data, loading } = useQuery(SECTIONS_QUERY, {
    variables: { id: Number(route.params.id) },
  })
  useEffect(() => {
    console.log(data)
  }, [])

  if (!data) {
    return <Text>Loading...</Text>
  }
  return (
    <View>
      <FlatList
        data={data.album.songs}
        renderItem={({ item }) => <SongListItem
          key={item.id}
          song={item}
        />}
        ListHeaderComponent={() => <AlbumHeader album={data.album} />}

      />

    </View>
  )
}

export default AlbumScreen