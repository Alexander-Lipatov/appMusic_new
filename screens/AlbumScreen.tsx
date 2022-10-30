import { View, Text, FlatList } from 'react-native'
import React, { useEffect } from 'react'
import { useRoute } from '@react-navigation/native'

import SongListItem from '../components/SongListItem'
import AlbumHeader from '../components/AlbumHeader'
import albumDetails from '../data/albumDetaild'



const AlbumScreen = () => {

  const route = useRoute()
  useEffect(() => {
    console.log(route);

  }, [])


  return (
    <View>
      <FlatList
        data={albumDetails.song}
        renderItem={({ item }) => <SongListItem
          key={item.id}
          song={item}
        />}
        ListHeaderComponent={() => <AlbumHeader album={albumDetails} />}

      />

    </View>
  )
}

export default AlbumScreen