import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from './styles'
import { Album } from '../../types'


export type AlbumHeaderProps = {
    album: Album
}


export default function AlbumHeader(props: AlbumHeaderProps) {
    const { album } = props
    return (
        <View style={styles.container}>
            <Image source={{ uri: album.imageUri }} style={styles.image} />
            <Text style={styles.title}>{album.name}</Text>
            <View style={styles.creatorContainer}>
                <Text style={styles.creator}> By {album.by}</Text>
                <Text style={styles.likes}>{album.likes} Likes</Text>
            </View>
            <TouchableOpacity>
                <View style={styles.play} >
                    <Text style={styles.buttonText}>PLAY</Text>
                </View>
            </TouchableOpacity>


        </View>
    )
}

