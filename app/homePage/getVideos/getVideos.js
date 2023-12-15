import { Video } from "expo-av"
import moment from "moment";
import { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import GetListVideos from "./getListVideos";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { getListVideos } from "../../../api/post/video";

export default getVideos = () => {
    const [commentData, setCommentData] = useState([]);
    const [requestData, setRequestData] = useState({
        in_campaign: "1",
        campaign_id: "1",
        latitude: "1.0",
        longitude: "1.0",
        index: "0",
        count: "20",
    });

    const handleHome = () =>{
        router.push('/homePage/home')
    }

    const handleGetVideos = async () => {
        try {
            const result = await getListVideos(requestData);
            setCommentData([...commentData,...result])
        } catch (error) {
            console.error('Error:', error);
        }
    }

    useEffect(() => {
        handleGetVideos();
    },[requestData])

    return (
        <View style={styles.container}>
            <View style = {styles.navbar}>
                <TouchableOpacity onPress={handleHome}>
                    <View style={styles.iconContainer}>
                        <Ionicons name="home" size={32} color="#333" />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={styles.iconContainer}>
                        <Ionicons name="tv" size={32} color="#333" />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={styles.iconContainer}>
                        <Ionicons name="people" size={32} color="#333" />
                    </View>                    
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={styles.iconContainer}>
                        <Ionicons name="search" size={32} color="#333" />
                    </View>                    
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={styles.iconContainer}>
                        <Ionicons name="notifications" size={32} color="#333" />
                    </View>                    
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={styles.iconContainer}>
                        <Ionicons name="menu" size={32} color="#333" />
                    </View>                     
                </TouchableOpacity>            
            </View>
            <FlatList
                data = {commentData}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => <GetListVideos item={item}/> }
                
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    author: {
        flexDirection: 'row',
        marginBottom: 10,
        marginTop: 10,
    },
    avatar: {
        width: 45,
        height: 45,
        borderRadius: 50,
        marginRight: 10,
      
    },
    iconContainer:{
        paddingLeft: 15,
        paddingRight: 15,
    },
    navbar:{
        flexDirection: "row", 
        paddingTop: 10, 
        paddingLeft: 20, 
        paddingRight:20,
        paddingBottom: 5, 
        justifyContent: "center",
        borderBottomColor: "#ddd",
        borderBottomWidth: 0.7,
    },
})