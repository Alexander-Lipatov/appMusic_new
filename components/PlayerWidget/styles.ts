import { StyleSheet } from 'react-native'
import Colors from '../../constants/Colors'



const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 64,
        backgroundColor: '#131313',
        width: '100%',
        borderColor: 'black',
        borderWidth: 1,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    progress: {
        height: 2,
        backgroundColor: 'white'
    },
    image: {
        height: 75,
        width: 75,
        marginRight: 10
    },
    rightContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    nameContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    iconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: 100,
        justifyContent: 'space-around'
    },
    title: {
        color: 'lightgray',
        fontSize: 16,
        fontWeight: 'bold',
        margin: 5,
    },
    artist: {
        color: 'gray',
        fontSize: 15,
    },

})

export default styles