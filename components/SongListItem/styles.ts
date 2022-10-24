import { StyleSheet } from 'react-native'



const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginHorizontal: 15,
        marginVertical: 10
    },
    image: {
        height: 75,
        width: 75,
    },
    rightContainer: {
        marginStart: 15,
        justifyContent: 'space-around',
    },
    title: {
        color: 'white',
        fontSize: 24
    },
    artist: {
        color: 'lightgray',
        fontSize: 18
    },
})

export default styles