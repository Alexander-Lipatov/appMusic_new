import { Image, StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native'
import React, { useContext } from 'react'
import { Song } from '../../types'
import styles from './styles'

import { AppContext } from '../../AppContext'

export type SongListItemProps = {
    song: Song
}

const SongListItem = (props: SongListItemProps) => {
    const { song } = props

    const { songId, setSongId } = useContext(AppContext)

    const onPlaySong = () => {

        setSongId(song.id)
    }

    return (
        <TouchableWithoutFeedback onPress={onPlaySong}>
            <View style={styles.container}>
                <Image source={{ uri: song.imageUrl }} style={styles.image} />
                <View style={styles.rightContainer}>
                    <Text style={styles.title}>{song.title}</Text>
                    <Text style={styles.artist}>{song.artist}</Text>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

export default SongListItem
