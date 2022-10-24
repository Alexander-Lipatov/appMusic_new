import React from "react";
import { Text, View, FlatList, TouchableOpacity } from "react-native"
import { Album } from "../../types";
import AlbumItem from "../Album";
import styles from "./styles";

export type AlbumCategoryProps = {
    title: string,
    albums: [Album]
}

const AlbumCategory = (props: any) => {
    return (
        <View style={styles.container}>
            <View style={{ display: "flex", flexDirection: 'row', justifyContent: 'space-between', }}>
                <Text style={styles.title}>{props.title}</Text>
                <TouchableOpacity style={styles.appButtonContainer}>
                    <Text style={styles.appButtonText}>...</Text>
                </TouchableOpacity>




            </View>

            <FlatList
                data={props.albums}
                renderItem={({ item }) => <AlbumItem album={item} />}
                keyExtractor={(item) => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
            />
        </View>
    )
}

export default AlbumCategory