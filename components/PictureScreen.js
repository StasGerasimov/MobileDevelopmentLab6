import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, Dimensions, Platform, StyleSheet, TouchableOpacity, StatusBar, SafeAreaView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import PictureLayout from "./PictureLayout";

import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const arraySplitter = (arr = [], maxArrSize = 9) => {
    const result = [];
    for (let i = 0; i < Math.ceil(arr.length / maxArrSize); i++) {
        result[i] = arr.slice(i * maxArrSize, (i * maxArrSize) + maxArrSize);
    }
    return result;
};

const window = Dimensions.get("window");
const screen = Dimensions.get("screen");

function MainScreen({ navigation }) {

    const [dimensions, setDimensions] = useState({ window, screen });
    const [imageVault, setImageVault] = useState([]);


    const onChange = ({ window, screen }) => {
        setDimensions({ window, screen });
    };

    useEffect(() => {
        Dimensions.addEventListener("change", onChange);
        return () => {
            Dimensions.removeEventListener("change", onChange);
        };
    });

    const styles = StyleSheet.create({
        container: {
            marginTop: StatusBar.currentHeight,
            backgroundColor: 'white',
            flex: 1,
            borderWidth: 1,
            borderColor: 'white',

        },

        textContainer: {
            flex: 1,
            marginTop: '1%'
            // justifyContent: 'center'
        },

        text: {
            textAlign: 'center',
            backgroundColor: 'white',
            fontSize: 18,

        },

        // Add form
        addPictureIcon: {
            textAlign: 'right',
            marginHorizontal: 16,
            marginBottom: 5,
            marginTop: 2,
            color: '#3076CB'
        },
    });

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={pickImage}>
                    <MaterialCommunityIcons style={styles.addPictureIcon} name="plus" color={'#808082'} size={30} />
                </TouchableOpacity>
            ),
        });
    }, [navigation]);


    useEffect(() => {
        const url = `https://pixabay.com/api/?key=19193969-87191e5db266905fe8936d565&q=yellow+flowers&image_type=photo&per_page=27`;
        (async () => {
            const fetchResult = await fetch(url);
            const loadedData = await fetchResult.json();
            const loadedDataURI = loadedData['hits'].map((loadData) => ({ uri: loadData['largeImageURL'] }));
            setImageVault(loadedDataURI);
        })();
    }, []);

    const pickImage = async () => {
        let pickedImage = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: false,
            quality: 1,
        });

        if (!pickedImage.cancelled) {
            setImageVault(prevState => [...prevState, { uri: pickedImage.uri }])
        }
    };

    const imageSize = {
        width: dimensions.window.width / 3,
        height: dimensions.window.width / 3,
    }

    const PictureLayoutComponent = arraySplitter(imageVault).map(
        image => (
            <PictureLayout
                key={image[0].uri}
                imageVault={image}
                width={imageSize.width}
                height={imageSize.height}
            />
        )
    );

    return (
        <SafeAreaView style={styles.container}>
            {/* <ScrollView>
                {imageVault.length === 0 ? <Text style={styles.text}> Empty </Text> : PictureLayoutComponent }
            </ScrollView> */}
            {
                imageVault.length === 0 ?
                <View style={styles.textContainer}>
                    <Text style={styles.text}>No items found</Text>
                </View> : 
                <ScrollView>
                    {PictureLayoutComponent}
                </ScrollView>
            }
        </SafeAreaView>
    );
}

const Stack = createStackNavigator();

export default function PictureScreen() {

    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('We need camera roll permissions to make this work!');
                }
            }
        })();
    }, []);


    return (
        <Stack.Navigator initialRouteName="Images">
            <Stack.Screen name="Images" component={MainScreen} />
        </Stack.Navigator>
    );
}