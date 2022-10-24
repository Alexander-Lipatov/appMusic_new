import React from 'react'
import { View, Image, Text, TouchableWithoutFeedback } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import styles from './styles'
import { Album } from '../../types'

export type AlbumProps = {
    album: Album,

}

const AlbumItem = (props: AlbumProps) => {

    const navigation = useNavigation()

    const onPress = () => {
        navigation.navigate('AlbumScreen', { id: props.album.id })
    }


    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View style={styles.container}>
                <Image style={styles.image} source={{ uri: props.album.imageUri }} />
                <Text style={styles.text}>{props.album.artistHeadline}</Text>
            </View>
        </TouchableWithoutFeedback>
    )
}

export default AlbumItem