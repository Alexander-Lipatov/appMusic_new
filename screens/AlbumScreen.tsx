import { View, Text, FlatList } from 'react-native'
import React, { useEffect } from 'react'
import { useRoute } from '@react-navigation/native'

import SongListItem from '../components/SongListItem'
import album from '../data/albumDetaild'



const AlbumScreen = () => {

  const route = useRoute()
  useEffect(() => {
    console.log(route);

  }, [])


  return (
    <View>
      <FlatList data={album.song} renderItem={({ item }) => <SongListItem key={item.id} song={item} />} />

    </View>
  )
}

export default AlbumScreen