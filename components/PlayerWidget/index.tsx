import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import styles from './styles'
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import { Sound } from 'expo-av/build/Audio';

const song = {
    id: '4',
    uri: 'https://museria.com/files/music/audio/209267?h=bd00992c2940cfd4c5e8095123de6d55',
    imageUrl: 'https://filed15-15.my.mail.ru/pic?url=https%3A%2F%2Fcontent-28.foto.my.mail.ru%2Fdraw%2Fmusic%2Fplaylist%2F18130039474%2Ftracks%2Fcover%3Fsource%3D1&mw=&mh=&sig=ee7511d256a9c8a91092e6b216ec8fb2',
    title: '24/17',
    artist: 'Остаться'
}

const PlayerWidget = () => {
    const [sound, setSound] = React.useState<Sound | null>(null);
    const [isPlay, setIsPlay] = React.useState<boolean>(true);

    const [durationMillis, setDurationMillis] = React.useState<number | null>(null);
    const [positionMillis, setPositionMillis] = React.useState<number | null>(null);


    const onPlaybackCurrentUpdate = (status: any) => {
        console.log(status)
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
        console.log('Playing Sound');
        await newSound.playAsync();
    }

    useEffect(() => {
        playCurrentSong()
    }, [])

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
