import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useContext } from 'react'
import styles from './styles'
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import { Sound } from 'expo-av/build/Audio';
import { AppContext } from '../../AppContext';
import { useQuery, gql } from '@apollo/client';
import { Song } from '../../types';




const GetSongToPlay = gql`
  query getSongs($id: Int!) {
    song(id: $id){
        id
        title
        uri
        imageUrl
        artist
    }
}
`


const PlayerWidget = () => {
    const [sound, setSound] = React.useState<Sound | null>(null);
    const [isPlay, setIsPlay] = React.useState<boolean>(true);

    const [durationMillis, setDurationMillis] = React.useState<number | null>(null);
    const [positionMillis, setPositionMillis] = React.useState<number | null>(null);

    const { songId } = useContext(AppContext)
    const { data } = useQuery(GetSongToPlay, { variables: { id: Number(songId) } })
    const [song, setSong] = React.useState<Song | null>(null)

    useEffect(() => {
        const song = async () => {
            try {
                setSong(data.song)
            } catch (e) {
                console.log(e);
            }
        }
        song()
    }, [songId])



    const onPlaybackCurrentUpdate = (status: any) => {
        // console.log(status)
        setIsPlay(status.isPlaying)
        setDurationMillis(status.durationMillis)
        setPositionMillis(status.positionMillis)
    }
    const playCurrentSong = async () => {

        if (sound) {
            await sound.unloadAsync()
        }

        const { sound: newSound } = await Sound.createAsync(
            { uri: song.uri },
            { shouldPlay: isPlay },
            onPlaybackCurrentUpdate

        )
        setSound(newSound);
        await newSound.playAsync();
    }

    useEffect(() => {
        if (song) { playCurrentSong(); }

    }, [song])

    const onPlayPausePress = async () => {
        if (!sound) {
            return
        }
        if (isPlay) {
            await sound.pauseAsync();
        } else {
            await sound.playAsync()
        }
    }

    const getProgress = () => {
        if (sound === null ||
            durationMillis === null ||
            positionMillis === null
        ) {
            return 0
        }
        return (positionMillis / durationMillis) * 100
    }

    if (!song) {
        return null
    }

    return (
        <View style={styles.container}>
            <View style={[styles.progress, { width: `${getProgress()}%` }]}></View>
            <View style={styles.item}>
                <Image source={{ uri: song.imageUrl }} style={styles.image} />
                <View style={styles.rightContainer}>
                    <View style={styles.nameContainer}>
                        <Text style={styles.title}>{song.title}</Text>
                        <Text style={styles.artist}>{song.artist}</Text>
                    </View>
                    <View style={styles.iconContainer}>
                        <AntDesign name="hearto" size={30} color="white" />{/* {name = "ios-heart"} */}
                        <TouchableOpacity onPress={onPlayPausePress}>
                            <Ionicons name={isPlay ? "ios-pause" : "ios-play"} size={30} color="white" />{/* {name = "ios-pause"} */}
                        </TouchableOpacity>
                    </View>
                </View>
            </View>


        </View>
    )
}

export default PlayerWidget
