import React from 'react';

import AccountScreen from "../components/AccountScreen";
import ChartScreen from "../components/ChartScreen";
import FilmScreen from "../components/FilmScreen";
import PicturesScreen from "../components/PictureScreen";

import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import AddPoster from "../components/AddPoster";
import PosterInfo from "../components/PosterInfo";

const Stack = createStackNavigator();


const filmStackNavigator = () => {
    return(
        <Stack.Navigator initialRouteName="FilmScreen">
            <Stack.Screen name="FilmScreen" component={FilmScreen} />
            <Stack.Screen name="AddPoster" component={AddPoster} />
            <Stack.Screen name="PosterInfo" component={PosterInfo} />
        </Stack.Navigator>
    )
}


const Tab = createBottomTabNavigator();

export default function AppNavigation() {
    return (
        <Tab.Navigator
            tabBarOptions={
                { labelStyle: { paddingBottom: 5 } }}
        >
            <Tab.Screen
                name="General"
                component={AccountScreen}
                options={{
                    tabBarLabel: 'General',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="account" color={color} size={size} />
                    ),
                }}
            />

            <Tab.Screen
                name="Charts"
                component={ChartScreen}
                options={{
                    tabBarLabel: 'Charts',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="poll" color={color} size={size} />
                    ),
                }}
            />

            <Tab.Screen
                name="Films"
                component={filmStackNavigator}
                options={{
                    tabBarLabel: 'Films',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="movie-roll" color={color} size={size} />
                    ),
                }}
            />

            <Tab.Screen
                name="Pictures"
                component={PicturesScreen}
                options={{
                    tabBarLabel: 'Pictures',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="image-frame" color={color} size={size} />
                    ),
                }}

            />
        </Tab.Navigator>
    );
}
